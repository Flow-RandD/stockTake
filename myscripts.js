      var radios = document.formA.unitOfMeasure;
        for(var i = 0, max = radios.length; i < max; i++) {
          radios[i].onclick = function() {
            if (this.value=="metre"){
              result = prompt("How many metres is this item:","3");
            }else {
              result = "";
            }
          }
        }
    
      $('#qty').on('focus', function() {
        $('html,body').animate({
                scrollTop: 450,
                scrollLeft: 0
            }, 400, function(){
                $('html,body').clearQueue();
            });
      });
      
      $('#notes').on('focus', function() {
        $('html,body').animate({
                scrollTop: 500,
                scrollLeft: 0
            }, 400, function(){
                $('html,body').clearQueue();
            });
      });
      
    function validatorGS(){
      var code = "validatorGS";
      var stockCdSRC = $('#ptNum').val();
	  	var stockCd = stockCdSRC.replace(/-/g,"");
		stockCd = stockCd.replace(/ /g,"");
      
      $.ajax({
        url:"https://script.google.com/macros/s/AKfycbxxRB4577AipPmQfMdJdR-9b85NeKJao7l868DgEtgouVPc9qMi/exec",data:
        {"code":code, "stockCd":stockCd}, 
        type:"GET",
        dataType:"json",
        }).done(function(res) {
          if (res==1){
            //alert(res);
          }else{
			$('.modal-header').text('Warning');
			$('.modal-body').text(res);
            $('#alertModal').modal('show')
          }
        })
          .fail(function(e) {
          alert("error:" + e)
        });
      }
  
    function validatorFS(){
      var code = "validatorFS";
      var stockCdSRC = $('#stockCd').val();
		var stockCd = stockCdSRC.replace(/-/g,"");
  		stockCd = stockCd.replace(/ /g,"");
		
      
      $.ajax({
        url:"https://script.google.com/macros/s/AKfycbxxRB4577AipPmQfMdJdR-9b85NeKJao7l868DgEtgouVPc9qMi/exec",data:
        {"code":code, "stockCd":stockCd}, 
        type:"GET",
        dataType:"json",
        }).done(function(res) {
          if (res==1){
            //alert(res);
          }else{
			$('.modal-header').text('Duplicate Alert');
			$('.modal-body').text(res);
			$('#alertModal').modal('show')
          }
        })
          .fail(function(e) {
          alert("error:" + e)
        });
      }

     function postToAppsScript(){      
      var location =$('#location').val();
      var ptNum = $('#ptNum').val();
      var stockCd = $('#stockCd').val();
      var unitOfMeasure = $('input[name="unitOfMeasure"]:checked').val() + " " + result;
      var qty = $('#qty').val();
      var notes = $('#notes').val();
      
      $.ajax({
        url:"https://script.google.com/macros/s/AKfycbxxRB4577AipPmQfMdJdR-9b85NeKJao7l868DgEtgouVPc9qMi/exec",data:
        {"location":location,"ptNum":ptNum,"stockCd":stockCd,"qty":qty,"unitOfMeasure":unitOfMeasure,"notes":notes}, 
        type:"POST",dataType:"json",statusCode:
        {0:function(){
            $('.modal-body').text("Stock record created!");
			$('#alertModal').modal('show');
            $('input[name="unitOfMeasure"]:checked').prop('checked',false);
            $('input[name="ptNum"], textarea').val('');
            $('input[name="stockCd"], textarea').val('');
            $('input[name="qty"], textarea').val('');
            $('input[name="notes"], textarea').val('');
              $('html,body').animate({
                  scrollTop: 0,
                  scrollLeft: 0
                }, 400, function(){
                $('html,body').clearQueue();
              });
          }
        }
      });
    }  
      
    function uncheckAll(){
        $('input[name="unitOfMeasure"]:checked').prop('checked',false);
        $('input[type="text"], textarea').val('');
    }
