import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

export default function Payment(props) {
    const amt= props.val+1;
    console.log("hello")
    console.log(amt)
    return (

         <PayPalScriptProvider options={{ "client-id": "Abl8sYhVrMZ1F3d7ndYggy4Lb8g6C0MLm7K3uCt5mYXuIq048Hk5vfrEbZN1yo-FMGVP-F_iMCi4yEBQ" }}>
            <PayPalButtons
                style={{ color: "blue", shape: "pill", label: "pay", height: 40 }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: amt,
                                },
                            },
                        ],
                    });
                }}
            />;
        </PayPalScriptProvider>
    );
}