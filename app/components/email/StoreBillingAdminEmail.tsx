import {
    Body,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";


type StorageBillingAdminNotificationEmailProps = {
    customerName: string;
    customerEmail: string;

    orderNumber: string;
    billingReference: string;

    installmentNumber: number;
    totalInstallments: number;

    amount: string;
    paidDate: string;

    stripePaymentIntentId?: string | null;
};


export default function StorageBillingAdminNotificationEmail({
    customerName,
    customerEmail,

    orderNumber,
    billingReference,

    installmentNumber,
    totalInstallments,

    amount,
    paidDate,

    stripePaymentIntentId,
}: StorageBillingAdminNotificationEmailProps) {

    return (
        <Html>
            <Head />

            <Preview>
                Storage payment received: {billingReference} - {amount}
            </Preview>

            <Body style={body}>

                <Container style={container}>

                    {/* Brand */}
                    <Text style={brand}>
                        KXH STORAGE & LOGISTICS
                    </Text>


                    {/* Heading */}
                    <Heading style={heading}>
                        Storage Payment Received
                    </Heading>


                    <Text style={intro}>
                        A storage installment payment has
                        been successfully received.
                    </Text>


                    {/* Payment highlight */}
                    <Section style={paymentBox}>

                        <Text style={paymentLabel}>
                            AMOUNT RECEIVED
                        </Text>

                        <Text style={paymentAmount}>
                            {amount}
                        </Text>

                        <Text style={paymentReference}>
                            {billingReference}
                        </Text>

                    </Section>


                    {/* Billing information */}
                    <Section style={section}>

                        <Text style={sectionTitle}>
                            Billing Details
                        </Text>


                        <DetailRow
                            label="Billing reference"
                            value={billingReference}
                        />

                        <DetailRow
                            label="Order"
                            value={`#${orderNumber}`}
                        />

                        <DetailRow
                            label="Installment"
                            value={
                                `Month ${installmentNumber} of ${totalInstallments}`
                            }
                        />

                        <DetailRow
                            label="Amount paid"
                            value={amount}
                        />

                        <DetailRow
                            label="Paid"
                            value={paidDate}
                        />

                    </Section>


                    <Hr style={divider} />


                    {/* Customer */}
                    <Section style={section}>

                        <Text style={sectionTitle}>
                            Customer
                        </Text>


                        <DetailRow
                            label="Name"
                            value={
                                customerName ||
                                "Unknown Customer"
                            }
                        />

                        <DetailRow
                            label="Email"
                            value={
                                customerEmail ||
                                "Not provided"
                            }
                        />

                    </Section>


                    {stripePaymentIntentId && (
                        <>
                            <Hr style={divider} />

                            <Section style={section}>

                                <Text style={sectionTitle}>
                                    Payment Information
                                </Text>

                                <Text style={label}>
                                    Stripe Payment Intent
                                </Text>

                                <Text style={paymentId}>
                                    {stripePaymentIntentId}
                                </Text>

                            </Section>
                        </>
                    )}


                    <Hr style={divider} />


                    <Text style={receiptNote}>
                        The customer's PDF payment receipt
                        is attached to this email for reference.
                    </Text>


                    <Text style={footer}>
                        KXH Storage & Logistics
                        <br />
                        Automated billing notification
                    </Text>

                </Container>

            </Body>
        </Html>
    );
}


function DetailRow({
    label,
    value,
}: {
    label: string;
    value: string;
}) {
    return (
        <Section style={row}>

            <Text style={rowLabel}>
                {label}
            </Text>

            <Text style={rowValue}>
                {value}
            </Text>

        </Section>
    );
}


/*
 * Email styles
 */

const body = {
    backgroundColor: "#f1f5f9",

    fontFamily:
        "Arial, Helvetica, sans-serif",

    margin: "0",

    padding: "32px 12px",
};


const container = {
    backgroundColor: "#ffffff",

    border:
        "1px solid #e2e8f0",

    borderRadius:
        "12px",

    maxWidth:
        "620px",

    margin:
        "0 auto",

    padding:
        "32px",
};


const brand = {
    color:
        "#5A862C",

    fontSize:
        "12px",

    fontWeight:
        "700",

    letterSpacing:
        "1.2px",

    margin:
        "0 0 12px",
};


const heading = {
    color:
        "#0f172a",

    fontSize:
        "26px",

    fontWeight:
        "700",

    margin:
        "0 0 12px",
};


const intro = {
    color:
        "#64748b",

    fontSize:
        "15px",

    lineHeight:
        "24px",

    margin:
        "0 0 24px",
};


const paymentBox = {
    backgroundColor:
        "#f0fdf4",

    border:
        "1px solid #bbf7d0",

    borderRadius:
        "10px",

    padding:
        "20px",

    margin:
        "0 0 28px",
};


const paymentLabel = {
    color:
        "#166534",

    fontSize:
        "10px",

    fontWeight:
        "700",

    letterSpacing:
        "1px",

    margin:
        "0 0 5px",
};


const paymentAmount = {
    color:
        "#14532d",

    fontSize:
        "28px",

    fontWeight:
        "700",

    margin:
        "0 0 4px",
};


const paymentReference = {
    color:
        "#15803d",

    fontSize:
        "13px",

    fontWeight:
        "600",

    margin:
        "0",
};


const section = {
    margin:
        "0",
};


const sectionTitle = {
    color:
        "#0f172a",

    fontSize:
        "15px",

    fontWeight:
        "700",

    margin:
        "0 0 14px",
};


const row = {
    borderBottom:
        "1px solid #f1f5f9",

    margin:
        "0",

    padding:
        "7px 0",
};


const rowLabel = {
    color:
        "#64748b",

    fontSize:
        "12px",

    margin:
        "0 0 3px",
};


const rowValue = {
    color:
        "#1e293b",

    fontSize:
        "14px",

    fontWeight:
        "600",

    margin:
        "0",
};


const divider = {
    borderColor:
        "#e2e8f0",

    margin:
        "26px 0",
};


const label = {
    color:
        "#64748b",

    fontSize:
        "12px",

    margin:
        "0 0 5px",
};


const paymentId = {
    backgroundColor:
        "#f8fafc",

    borderRadius:
        "6px",

    color:
        "#334155",

    fontFamily:
        "monospace",

    fontSize:
        "11px",

    padding:
        "10px",

    wordBreak:
        "break-all" as const,

    margin:
        "0",
};


const receiptNote = {
    color:
        "#475569",

    fontSize:
        "13px",

    lineHeight:
        "21px",

    margin:
        "0 0 28px",
};


const footer = {
    color:
        "#94a3b8",

    fontSize:
        "11px",

    lineHeight:
        "18px",

    margin:
        "0",
};