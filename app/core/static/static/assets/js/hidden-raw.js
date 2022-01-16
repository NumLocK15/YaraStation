$(".exploder").click(function(){
  
    $(this).toggleClass("btn-success btn-danger");
    
    $(this).children("span").toggleClass("glyphicon-search glyphicon-zoom-out");  
    
    $(this).closest("tr").next("tr").toggleClass("hide");
    
    if($(this).closest("tr").next("tr").hasClass("hide")){
      $(this).closest("tr").next("tr").children("td").slideUp();
    }
    else{
      $(this).closest("tr").next("tr").children("td").slideDown(350);
    }
});