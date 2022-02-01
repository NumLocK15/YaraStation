using System.Diagnostics;
using System.IO.Compression;

namespace yarastation_agent
{
    public class Worker : BackgroundService
    {
        private readonly ILogger<Worker> _logger;
        public HttpClient client;

        // declare the variables
        public string mac_add, os, client_ip_add, token, status, 
            hostname, serv_ip, tempDownloadLocation, loki, 
            archiveLocation, entity, passedLocation;

        public Worker(ILogger<Worker> logger, string v)
        {
            _logger = logger;
            passedLocation = v;
        }

        public override Task StartAsync(CancellationToken cancellationToken)
        {   
            // intlizing the data from the config file
            readConfig();
            createArchiveFolder();

            // starting the httpclient when the service start, this is to avoid creating multiple clients. 
            client = new HttpClient();
            client.DefaultRequestHeaders.Add("Authorization", "token " + token);

            return base.StartAsync(cancellationToken);
        }

        protected override async Task ExecuteAsync(CancellationToken stoppingToken)
        {
            while (!stoppingToken.IsCancellationRequested)
            {
                _logger.LogInformation("Worker running at: {time}", DateTimeOffset.Now);
                await send_hearbeat();
                await Task.Delay((1000*60)*2, stoppingToken); // waiting 2min
            }
        }

        public void readConfig()
        {
            string[] lines = System.IO.File.ReadAllLines(@passedLocation);
            mac_add = lines[0].Split(':')[1];
            hostname = lines[1].Split(':')[1];
            os = lines[2].Split(':')[1];
            client_ip_add = lines[3].Split(':')[1];
            status = lines[4].Split(':')[1];
            serv_ip = lines[5].Split(':')[1];
            token = lines[6].Split(':')[1];
            tempDownloadLocation = lines[7].Split('=')[1] + "/ysTempLocation/";
            entity = lines[8].Split(':')[1];
            loki = "loki.exe";
        }
        public void createArchiveFolder()
        {
            archiveLocation = Directory.GetCurrentDirectory() + "\\Archived_Results"; 
            if (!Directory.Exists(archiveLocation))
            {
                Directory.CreateDirectory(Directory.GetCurrentDirectory() + "\\Archived_Results");
            }

            // Setting temp directory //
            string dir = tempDownloadLocation;
            if (!Directory.Exists(dir)) // If directory does not exist, create it

            {
                Directory.CreateDirectory(dir);
                Directory.CreateDirectory(dir + "\\signature-base");
                Directory.CreateDirectory(dir + "\\signature-base\\iocs");
                Directory.CreateDirectory(dir + "\\signature-base\\yara");
            }
        }

        public async Task send_hearbeat()
        {
            _logger.LogInformation("<< Starting Heartbeat >>");
            
            // prepare data
            var formContent = new MultipartFormDataContent
            {
                {new StringContent(os),"os"},
                {new StringContent(mac_add),"mac_add"},
                {new StringContent(client_ip_add),"ip_add" },
                {new StringContent(hostname),"host_name" },
                {new StringContent("1"),"status" }
            };
        
            // send heartbeat request
            var results = await client.PostAsync("http://" + serv_ip + "/api/heartbeat/", formContent);
            var result_string = await results.Content.ReadAsStringAsync();
            string policy_check ;

            try
            {
                //cleaning up the respnse to cheack if there is a schedualled scan:
                policy_check = result_string.Split(',')[1].Replace("\'", "").Split(":")[0].TrimStart().TrimEnd();
            }
            catch (Exception)
            {
                policy_check = "not found";
            }
           
            // checking new policy
            if (policy_check.Equals("policy_name"))
            {
                _logger.LogInformation("<< End Heartbeat >>");

                if (File.Exists(tempDownloadLocation + loki))
                {
                    _logger.LogInformation(">> " + tempDownloadLocation + loki + ".zip" + "File Already exists skipping download..");
                }
                else
                {
                    // Downloading Loki executable..
                    await download_policy(loki);
                }


                //cleanup the policy name 
                var file_name = result_string.Split(',')[1].Replace("\'", "").Split(":")[1].TrimStart().TrimEnd();

                if (File.Exists(tempDownloadLocation + file_name + ".zip"))
                {
                    _logger.LogInformation(">> " + tempDownloadLocation + loki + ".zip" + "File Already exists skipping download..");
                }
                else
                {
                    // Downloading Policy..
                    await download_policy(file_name + ".zip");
                }


                if (File.Exists(tempDownloadLocation + file_name + ".zip") && File.Exists(tempDownloadLocation + loki))
                {
                    await exeuteScan(tempDownloadLocation + file_name + ".zip"); 
                }
                else
                {
                    _logger.LogInformation(">> One of the files is missing,, skipping scan!!");
                }
            }
            else
            {
                _logger.LogInformation("<< End Heartbeat >>");
            }
        }

        public async Task download_policy(string file_name)
        {
            _logger.LogInformation("<< Starting policy download >>");

            // Setting temp directory //
            string dir = tempDownloadLocation;
            // If directory does not exist, create it
            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
                Directory.CreateDirectory(dir + "\\signature-base");
                Directory.CreateDirectory(dir + "\\signature-base\\iocs");
                Directory.CreateDirectory(dir + "\\signature-base\\yara");
            }

            // prepare data
            var formContent = new MultipartFormDataContent
            {
                {new StringContent(file_name),"policy_name"}
            };

            // send download request
            var results = await client.PostAsync("http://" + serv_ip + "/api/download_policy/", formContent);

            using (var fs = 
                new FileStream((tempDownloadLocation + file_name), FileMode.CreateNew))
            {
                await results.Content.CopyToAsync(fs);
            }

            // var results = await client.PostAsync("http://" + serv_ip + "/api/download_policy/", formContent);
            _logger.LogInformation("<< Ending policy download >>");
        }

        public async Task exeuteScan (string file_name)
        {
            _logger.LogInformation("<< Starting Loki scan Process >>");

            Process[] pname = Process.GetProcessesByName("notepad"); //check if loki is currentlly running
            if (pname.Length > 1)
            {
                _logger.LogInformation("!! loki scanning is detected, skipping this scan until the old is finished.. !!");

            }else
            {
                // uncompressing the files
                try
                {
                    ZipFile.ExtractToDirectory(file_name, tempDownloadLocation + "\\signature-base\\yara");
                }
                catch (Exception)
                {
                }

                //Running loki scan

                using (System.Diagnostics.Process process = new System.Diagnostics.Process())
                {
                    process.StartInfo = new System.Diagnostics.ProcessStartInfo(@tempDownloadLocation + "\\" + loki);
                    process.StartInfo.Arguments = "--noprocscan --allhds";
                    process.StartInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
                    process.Start();

                    //// do some other things while you wait...
                    if (!process.HasExited)
                    {
                        process.WaitForExit(((1000 * 60) * 60) * 24); // give 24h for process to finish
                        if (!process.HasExited)
                        {
                            process.Kill(); // took too long, kill it off
                        }
                    }
                }
                _logger.LogInformation("<< Ending Loki scan Process >>");
                await uploadResults();
            }
        }

        public async Task cleanup()
        {
            string dir = tempDownloadLocation;
            // If directory exist, delete it
            if (Directory.Exists(dir))
            {
                Directory.Delete(dir, true);
            }
            createArchiveFolder();
        }

        public async Task uploadResults()
        {
            //cleanup(); // removing policy and loki agent.

            _logger.LogInformation("<< Starting Upload process>>");

            //reading results
            string[] files = System.IO.Directory.GetFiles(Directory.GetCurrentDirectory(), "*.log");
            if (files.Length > 0)
            {
                foreach (var file in files)
                {
                    string results = System.IO.File.ReadAllText(file);

                    //Enconding 
                    var resultsBytes = System.Text.Encoding.UTF8.GetBytes(results);
                    var encodedResults = System.Convert.ToBase64String(resultsBytes);

                    // prepare data
                    var formContent = new MultipartFormDataContent
                    {
                        {new StringContent(encodedResults),"results"},
                        {new StringContent("Agnet_scan"),"sc_scan"},
                        {new StringContent(entity),"entity"},
                        {new StringContent(mac_add),"mac_add"}
                    };

                    // send download request
                    var response = await client.PostAsync("http://" + serv_ip + "/api/agent_upload/", formContent);
                    _logger.LogInformation(response.ToString());

                    // move to archive in case the upload fails
                    try
                    {
                        string[] splitedfileName = file.Split("\\");
                        string filename = splitedfileName[splitedfileName.Length - 1];
                        _logger.LogInformation(archiveLocation + "\\" + filename);


                        File.Move(file, archiveLocation + "\\" + filename);
                    }
                    catch (IOException iox)
                    {
                        Console.WriteLine(iox.Message);
                    }
                }
            }
            _logger.LogInformation("<< Ending Upload process >>");
        }
    }
}