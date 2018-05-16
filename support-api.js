/**
 * Created by smetshile on 2016/08/16.
 */
$.ajax({
    type: "GET",
    url: "https://uat.e4.co.za/e4SupportManager/support",
    dataType: "jsonp",
    async: true,
    crossDomain: true,
    jsonp: "callback",
    beforeSend: function (xhr) {
        xhr.setRequestHeader('Content-type', 'application/json;charset=utf-8');
    },
    success: function (xml) {
        // debugger;
        // alert("YAY!");
        // message
        var messageval = xml.message.MessageText;
        var messagetype = xml.message.Type.CssClass;

        //displaying the server message
        $('#response').html(messageval).addClass(messagetype);

        console.log(xml);

        //Check if system status has something. if not hide the div
        if(!$.isArray(xml.systemStatus) || xml.systemStatus.length === 0 ) {
            $(".system-statuses").css("display","none");
        }
        else {
            $(".system-statuses").css("display","block");
        }

        var syst = xml.systemStatus;

        for (var i = 0; i < syst.length;i++ ) {
            var d = syst[i].DateAdded;
            var options1 = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric', second: 'numeric',
                hour12: true };
            var mydate = new Date(parseInt(d.substr(6))).toLocaleDateString('en-US', options1);


            var html = '<tr class="myRow"><td>'+mydate+'</td>';

            if(syst[i].UpdateDate != null) {
                var du = syst[i].UpdateDate;
                var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',hour: 'numeric', minute: 'numeric', second: 'numeric',
                    hour12: true };
                var dateupdated = new Date(parseInt(du.substr(6))).toLocaleString('en-US', options);
                html += '<td>'+dateupdated+'</td>';
            }
            else {
                html += '<td>'+'</td>';
            }

            html += '<td><span class="'+syst[i].Type.cssClass+'"></span>'+ '</td>';
            html += '<td>'+syst[i].Impact+'</td>';
            html += '<td>'+syst[i].Info+'</td>';
            html += '<td>'+syst[i].Resolution+'</td>';
            html += '</tr>';
            $('.table').append(html);

            /*$('.table').append(
                '<tr class="myRow">',
                '<td>'+mydate+'</td>',
                '<td>'+((syst[i].UpdateDate != null) ? updatedd: "nothing here")+'</td>',
                '<td><span class="'+syst[i].Type.cssClass+'"></span> '+syst[i].Type.Name+'</td>',
                '<td>'+syst[i].Impact+'</td>',
                '<td>'+syst[i].Info+'</td>',
                '<td>'+syst[i].Resolution+'</td>',
                '</tr>'
            );*/

        }

    },
    error: function () {
        alert("Something is wrong.");
    },

    complete: function (xhr, status) {
        //$('#showresults').slideDown('slow')
    }
});



