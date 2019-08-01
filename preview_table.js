$( document ).ready(function() {

  $.getJSON('table_real.json', function(data) {

	  var sum1 = 0;	
	  var sum2 = 0;	
	  var percent = 0;	

      for(var i=0;i<data.length;i++){

      		//Format Date
      	 	function reverseDate(tdDateFormat) {
	  			var arr = tdDateFormat.split('-');
			    return arr[2] + '/' + arr[1] + '/' + arr[0].slice(2, 4);
			}
	  		var tdDateFormat = reverseDate(data[i].date_start);
      		
			var logo1;
			var logo2;
			var teamNamesMob = '<span class="teams-names-mob">' + data[i].team1 + ' - ' + data[i].team2 + '</span>';
			var teamTooltip = '<div class="teams-tooltip">' + data[i].team1 + ' - ' + data[i].team2 + ' (' + data[i].tournament + ')</div>';
			var sumValue = 100;

			//Generate logos
			if(data[i].team1_logo !== null && data[i].team1_logo !== ''){
				var logo1 = '<img src="/image/' + data[i].team1_logo + '" class="teams-img team1-img">';
			} else {
				var logo1 = '';
			};
			if(data[i].team2_logo !== null && data[i].team2_logo !== ''){
				var logo2 = '<img src="/image/' + data[i].team2_logo + '" class="teams-img team2-img">';
			} else {
				var logo2 = '';
			};
		 	//Generate Teams on Mobile
		 	if (data[i].team1_logo == null || data[i].team1_logo == '' || data[i].team2_logo == null || data[i].team2_logo == '') {
				var tdTeamsMob = '</td><td class="td-teams">' + 
				'<div class="teams-block">' +					
					teamTooltip +
					'<span class="teams-names">' + data[i].team1 + ' - '  + data[i].team2 + '</span>'
				'</div>';
			} else {
				var tdTeamsMob = '</td><td class="td-teams">' + 
				'<div class="teams-block">' + 
					teamTooltip +				
					logo1 + logo2 + 				
				'</div>';
			};
			//Generate Teams on Desktop
		 	if (data[i].team1_logo == null || data[i].team1_logo == ''|| data[i].team2_logo == null || data[i].team2_logo == '') {
				var tdTeamsDesk = '</td><td class="td-teams">' + 
				'<div class="teams-block">' +					
					'<span class="teams-names">' + data[i].team1 + ' - '  + data[i].team2 + '</span>' + 
				'</div>';
			} else {
				var tdTeamsDesk  = '</td><td class="td-teams">' + 
				'<div class="teams-block">' + 				
					logo1 + '<span class="teams-names">' + data[i].team1 + ' - '  + data[i].team2 + '</span>' + logo2 				
				'</div>';
			};			

			//Generate Bookmaker Names and Logos
			if(data[i].bookmaker == "pin") {
				var bookmaker_logo = '<img src="/image/data/preview-images/pin.jpg" class="bookmaker-img">';
				var bookmaker_name = '<p>Pinnacle</p>';
			} else if(data[i].bookmaker == "pm") {
				var bookmaker_logo = '<img src="/image/data/preview-images/pm.jpg" class="bookmaker-img">';
				var bookmaker_name = '<p>Pari Match</p>';
			}  else if(data[i].bookmaker == "365") {
				var bookmaker_logo = '<img src="/image/data/preview-images/365.jpg" class="bookmaker-img">';
				var bookmaker_name = '<p>365bet</p>';
			};

			var tdLink =  '<a href="/' + data[i].alias +'" target="_blank">';	
      	 	var tdDate = '<tr><td class="td-date">';
      		var tdTeams = '</td><td class="td-teams"><img src="/image/data/preview-images/';
      		var tdTourn = '</td><td class="td-tourn">';
      		var tdBet = '</td><td class="td-bet">';   
      		var tdBookmaker = '</td><td class="td-bookmaker">';   		
      		var tdOdds = '</td><td class="td-odds td-num">';
      		var tdSum =  '</td><td class="td-sum td-num">';
      		var tdResult = '$</td><td class="table__result td-num">';
      		var tdMore = '$</td><td class="td-more"><a href="' + data[i].alias + '"> >> </a></td><tr>';
      		var tdMoreMob = '$</td><td class="td-more td-more-mob"><a href="' + data[i].alias + '">>></a></td><tr>';

	      	//Generate table for desktop	
	      	if(document.documentElement.clientWidth >= 800) {
	              $('#table-data').append(
	                  tdDate + tdLink + tdDateFormat +
	                  tdTeamsDesk + 	                 
	                  tdTourn + tdLink + data[i].tournament + 
	                  tdBet + tdLink + data[i].bet + 
	                  tdBookmaker + tdLink +  bookmaker_logo + bookmaker_name + 
	                  tdOdds + tdLink + parseFloat(data[i].odds) + 
	                  tdSum + tdLink + sumValue + 
	                  tdResult + tdLink + parseFloat(data[i].result) + 
	                  tdMore + tdLink 
	              );               
	      	};

	      	//Generate table for mobile	
	        if(document.documentElement.clientWidth < 800) {
				$('#table-data').append(
	              tdDate + tdDateFormat + 
	              tdTeamsMob + 
	              tdBet + data[i].bet_mob + 
	              tdBookmaker +  bookmaker_logo +
	              '<td class="td-odds td-num">' + parseFloat(data[i].odds) + 
	              tdSum + sumValue + 
	              tdResult + parseFloat(data[i].result) + tdMoreMob); 

				  //Teams Tooltip on mobile	
	              $(".teams-block").click(function(){
					 $(this).find('.teams-tooltip').show();
				  });                  
				  $(document).on('click', function(e) {
					  if (!$(e.target).closest(".teams-block").length) {
					    $(this).find('.teams-tooltip').hide();
					  }
					  e.stopPropagation();
				  }); 						
			};					 

		    sum1 += sumValue;    
		    sum2 += parseFloat(data[i].result);	    
		    percent =  sum2/sum1 * 100;    
		    percent = (Math.round(percent * 100) / 100);

	 };   //for - end	

      //Color row for mobile
      $('.table__result').each(function(){
		  var cellResult = $(this).html().slice(0,-1);
		  var row = $(this).closest('tr');
		  if(!isNaN(parseFloat(cellResult))) {				  	
		    if (cellResult > 0) {
		      row.addClass("positive");
		    } else if (cellResult < 0) {
		      row.addClass("negative");
		    } else if (cellResult == 0) {
		      row.addClass("null");
		    }
		  }
	 });  

      //Color row for desctop
      $('.table__result a').each(function(){
		  var cellResult = $(this).html().slice(0,-1);
		  var row = $(this).closest('tr');
		  if(!isNaN(parseFloat(cellResult))) {				  	
		    if (cellResult > 0) {
		      row.addClass("positive");
		    } else if (cellResult < 0) {
		      row.addClass("negative");
		    } else if (cellResult == 0) {
		      row.addClass("null");
		    }
		  }
	 });  
      
    if(document.documentElement.clientWidth < 800) {
      //Last row on Mobile	
	      $('#table-data:last-child').append(
	      	'<tr class="prev-table-results"><td colspan="4"></td><td class="percent">' + percent + '%' + '</td><td class="sum1">' + sum1 + '$</td><td class="sum2 table__result">' + sum2 + '$</td><tr>'
	      );
  	} else {
      //Last row on Desktop
      $('#table-data:last-child').append(
      	'<tr class="prev-table-results"><td colspan="5"></td><td class="td-num percent">' + percent + '%' + '</td><td class="td-num sum1">' + sum1 + '$</td><td class="td-num sum2 td-numtable__result">' + sum2 + '$</td><td></td><tr>'
      );
  	};

  }); 

  $("#sub_modal").css("display", "none");   

});