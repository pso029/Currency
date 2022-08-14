var mycur, jsontxt, flagkey, date, longname, currencykeys;

$(document).ready(function(){
  $('body').css('padding-top', $('nav').outerHeight());
    converter();
    jsonText();
    var settings = {
        "url": "https://currencyapi.net/api/v1/rates?key=30wgjRyDxdLJRC7mfIjsaWLTUWGJOXUS73qL&output=JSON",
        "method": "GET",
        "timeout": 0,
      };
      
    $.ajax(settings).done(function (response) {
      setTimeout(
        function() 
        {
          getData(response);
          $('.cvtindiv').css('display','block');
          $('.spin').css("display", "none");
        }, 500);
      });

    function jsonText(){
        $.get("js/json/currencies.txt", function(textData){
            jsontxt = JSON.parse(textData);
        })
    }
    function getData(data){
        let unix_timestamp = data.updated;
        date = new Date(unix_timestamp*1000);

        currencydata = data.rates;
        mycur = currencydata;
        longname = jsontxt.currencies;
        currencykeys = Object.keys(currencydata);
        currencykeys.forEach(key => {
            var select = $("#from");
            var select2 = $("#to"); 
            var el = document.createElement("option");
            var el2 = document.createElement("option");
            el.textContent = key  + " (" +  longname[key] + " )";
            el2.textContent = key + " (" +  longname[key] + " )";
            if(key === 'USD'){
              el.selected = "selected";
              
            }
            if(key === 'MMK'){
              el2.selected = "selected";
      
            }
            el.value = key;
            el2.value = key;
            select.append(el);
            select2.append(el2);
            
          });

          flagkey = "<img src='images/USD.png' width='80' height='50'>";
          $("#flag").html(flagkey);
          flagkey = "<img src='images/MMK.png' width='80' height='50'>";
          $("#flag2").html(flagkey);

          InsertTable();

          $('#from').change(function(){
            flagkey = "<img src='images/"+$("#from option:selected").val() + ".png' width='80' height='50'>";
            $("#flag").html(flagkey);
          });
          $('#to').change(function(){
            flagkey = "<img src='images/"+$("#to option:selected").val() + ".png' width='80' height='50'>";
            $("#flag2").html(flagkey);
          });
    }
      
  
  });

function Convert(){
  var curval = $('#from').val();
  var curval2 = $("#to").val();
  var getval = (mycur[curval2]/mycur[curval]).toFixed(3);
  getval = parseFloat(getval);
  var amt = $("#amount").val();
  var resultopt = 0.0;
  if (amt === ''){
    amt = '1';
  }
  var numbers = /^[0-9]?[.]?[0-9]+$/;
  if (amt.match(numbers)){
    resultopt = parseFloat(amt);
    resultopt = (getval*resultopt).toFixed(3);
    txtopt = amt + ' ' + curval + ' is = ' + resultopt + ' '+ curval2;
    $('#output').text(txtopt);
    //updtime = "Lastest Updated at " + date;
    //$('.update_time').text(updtime);
    var element = document.getElementById("output");
    element.scrollIntoViewIfNeeded();
  }
  else{
    document.getElementById("value").innerHTML = "Invalid Input";
  }
}

function converter(){
  $('.popular').css("display","none");
  $('.myhistory').css("display","none");
  $('.timeframe').css("display","none");
  $('.pricing').css("display","none");
  $('.converter').css("display", "block");
  $('#2').removeClass("active")
  $('#3').removeClass("active")
  $('#4').removeClass("active")
  $('#5').removeClass("active")
  $('#1').addClass("active")
  scrollToTop();
}
function rates(){
  $('.myhistory').css("display","none");
  $('.timeframe').css("display","none");
  $('.pricing').css("display","none");
  $('.converter').css("display", "none");
  $('.popular').css("display","block");
  $('.all_currency').css("display", "none");
  $('#1').removeClass("active")
  $('#3').removeClass("active")
  $('#4').removeClass("active")
  $('#5').removeClass("active")
  $('#2').addClass("active")
  scrollToTop();

}
function myhistory(){
  $('.converter').css("display", "none");
  $('.timeframe').css("display","none");
  $('.pricing').css("display","none");
  $('.popular').css("display","none");
  $('.myhistory').css("display","block");
  $('#1').removeClass("active")
  $('#2').removeClass("active")
  $('#4').removeClass("active")
  $('#5').removeClass("active")
  $('#3').addClass("active")
}

function timeframe(){
  $('.converter').css("display", "none");
  $('.myhistory').css("display","none");
  $('.pricing').css("display","none");
  $('.popular').css("display","none");
  $('.timeframe').css("display","block");
  $('#1').removeClass("active")
  $('#2').removeClass("active")
  $('#3').removeClass("active")
  $('#5').removeClass("active")
  $('#4').addClass("active")
}

function pricing(){
  $('.converter').css("display", "none");
  $('.myhistory').css("display","none");
  $('.timeframe').css("display","none");
  $('.popular').css("display","none");
  $('.pricing').css("display","block");
  $('#1').removeClass("active")
  $('#2').removeClass("active")
  $('#3').removeClass("active")
  $('#4').removeClass("active")
  $('#5').addClass("active")
  scrollToTop();
}

function InsertTable(){
  var curname = ["United State Dollar", "Euro", "Singapore Dollar", "Japanese Yen", "Australian Dollar", "Chinese Yuan", "Indian Rupee", "Thai Baht"];
  var curshrt = ["USD", "EUR", "SGD", "JPY", "AUD", "CNY", "INR", "THB"];
  mmk = mycur.MMK;
  updtime = "Lastest Updated at " + date;
  $('.update_time').text(updtime);
  let i;
  for (i = 0; i < curname.length; i++){
    flagtab = "<img src='images/"+ curshrt[i] + ".png' width='50' height='30'>";
    $("#curlist>tbody").append("<tr><td>" + flagtab + "</td><td>" + curname[i] + "</td><td>" + curshrt[i] + "</td><td>" + (mmk/mycur[curshrt[i]]).toFixed(3) + "</td></tr>")
  
  }
  i = 0;
  for (i = 0; i < currencykeys.length; i++){
    flagtab = "<img src='images/"+ currencykeys[i] + ".png' width='50' height='30'>";
    $("#curlistall>tbody").append("<tr><td>" + flagtab + "</td><td>" + longname[currencykeys[i]] + "</td><td>" + currencykeys[i] + "</td><td>" + (mmk/mycur[currencykeys[i]]).toFixed(3) + "</td></tr>")
  }
}

function seeAll(){
  $('.less_currency').css("display", "none");
  $('.all_currency').css("display", "block");
}
function seeLess(){
  $('.all_currency').css("display", "none");
  $('.less_currency').css("display", "block");
}

function scrollToTop() {
  $(window).scrollTop(0);
}