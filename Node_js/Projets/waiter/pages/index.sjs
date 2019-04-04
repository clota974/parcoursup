<% 
  requireMod("qrcode");
%>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Hid</title>
    <script src="https://www.paypalobjects.com/api/checkout.js"></script>
  </head>
  <body>
  <% 
    qr = __mods.qrcode;
    urla = "Hi there";
    
    @function say(text) {      
      echo(text)
    }@endf;

    async @function generateQR(text) {      
      try {
        qr = await qr.toDataURL(text);
        console.log(qr);
        echo(qr)
        @resolve test;
      } catch (err) {
        @resolve test;        
        console.error(err);
      }
    }@endf;

    generateQR();


    say("hello");

    echo("hi")

    %>{{urla}}

     <div id="paypal-button-container"></div>

<script>
    paypal.Button.render({

        env: 'sandbox', // sandbox | production

        // PayPal Client IDs - replace with your own
        // Create a PayPal app: https://developer.paypal.com/developer/applications/create
        client: {
            sandbox:    'AR1r7RP4NFESERQKAhPtASA_g9KuWPOixUJUaNNycHSANIn5ky5s9y0l0HOv4X2rSaXTVyN8E-vw3A7F',
            production: '<insert production client id>'
        },

        // Show the buyer a 'Pay Now' button in the checkout flow
        commit: true,

        // payment() is called when the button is clicked
        payment: function(data, actions) {

            // Make a call to the REST api to create the payment
            return actions.payment.create({
                payment: {
                    transactions: [
                        {
                            amount: { total: '0.01', currency: 'EUR' }
                        }
                    ]
                },
                experience: { name: "Alon Fé Festival" }
            });
        },

        // onAuthorize() is called when the buyer approves the payment
        onAuthorize: function(data, actions) {

            // Make a call to the REST api to execute the payment
            return actions.payment.execute().then(function() {
                window.alert('Payment Complete!');
            });
        }

    }, '#paypal-button-container');

</script>
  </body>
</html>
