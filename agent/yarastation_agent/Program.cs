using yarastation_agent;



IHost host = Host.CreateDefaultBuilder(args)
    .UseWindowsService()
    .ConfigureServices(services =>
    {
        Console.WriteLine(args[0]);
        //services.AddHostedService<Worker>();
        services.AddHostedService
        (Worker => new Worker (Worker.GetService<ILogger<Worker>>(),args[0]));
    })
    .Build();

await host.RunAsync();
