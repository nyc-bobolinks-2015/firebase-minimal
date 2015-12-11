var fbRef = new Firebase("https://stevenabcdef.firebaseio.com/");


document.addEventListener('DOMContentLoaded', function(){


  /* sending messages */

   document.getElementById('form').addEventListener('submit', function(event){
    event.preventDefault();
    var fromUser = document.getElementById('fromUser').value;
    var toUser = document.getElementById('toUser').value;
    var messageObj = {
      fromUser: fromUser,
      toUser:  toUser,
      message: document.getElementById('msgText').value,
      sent_at: new Date()
    };

    var dest = 'msgs/' + [fromUser.toLowerCase(), toUser.toLowerCase()].sort().join('-');

    var node  = fbRef.child(dest);
    node.push(messageObj);

   });


   /* receiving messages - listener */
  var myNode = 'msgs/laura-steven';

  fbRef.child(myNode).on("value", function(snapshot) {

    var element = document.getElementById('messages');

    var output = '';
    snapshot.forEach(function(child){
      var msg = child.val();
      output += ("From: " + msg.fromUser + " To: " + msg.toUser + "<br>" + msg.message + "<br><br>");
    });
    element.innerHTML = output;
  });

});