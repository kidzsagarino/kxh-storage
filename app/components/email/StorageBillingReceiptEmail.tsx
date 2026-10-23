import {
    Body,
    Button,
    Container,
    Head,
    Heading,
    Hr,
    Html,
    Preview,
    Section,
    Text,
} from "@react-email/components";

type Props = {
    customerName: string;
    orderNumber: string;
    billingReference: string;
    installmentNumber: number;
    totalInstallments: number;
    amount: string;
    paidDate: string;
};

export default function StorageBillingReceiptEmail({
    customerName,
    orderNumber,
    billingReference,
    installmentNumber,
    totalInstallments,
    amount,
    paidDate,
}: Props) {
    return (
        <Html>
            <Head />

            <Preview>
                Payment received for {billingReference}
            </Preview>

            <Body style={body}>
                <Container style={container}>

                    <Text style={brand}>
                        KXH STORAGE & LOGISTICS
                    </Text>

                    <Heading style={heading}>
                        Payment received
                    </Heading>

                    <Text style={text}>
                        Hi {customerName},
                    </Text>

                    <Text style={text}>
                        Thank you. We have successfully
                        received your storage payment.
                    </Text>

                    <Section style={details}>
                        <Text style={row}>
                            <strong>Order:</strong>{" "}
                            {orderNumber}
                        </Text>

                        <Text style={row}>
                            <strong>Billing reference:</strong>{" "}
                            {billingReference}
                        </Text>

                        <Text style={row}>
                            <strong>Installment:</strong>{" "}
                            Month {installmentNumber} of{" "}
                            {totalInstallments}
                        </Text>

                        <Text style={row}>
                            <strong>Amount paid:</strong>{" "}
                            {amount}
                        </Text>

                        <Text style={row}>
                            <strong>Paid:</strong>{" "}
                            {paidDate}
                        </Text>
                    </Section>

                    <Text style={text}>
                        Your official payment receipt is
                        attached to this email.
                    </Text>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Thank you for choosing KXH Storage
                        & Logistics.
                    </Text>

                </Container>
            </Body>
        </Html>
    );
}

const body = {
    backgroundColor: "#f8fafc",
    fontFamily:
        "Arial, Helvetica, sans-serif",
    padding: "32px 12px",
};

const container = {
    backgroundColor: "#ffffff",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "32px",
    borderRadius: "12px",
};

const brand = {
    color: "#5A862C",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1px",
};

const heading = {
    color: "#0f172a",
    fontSize: "26px",
    marginBottom: "24px",
};

const text = {
    color: "#475569",
    fontSize: "15px",
    lineHeight: "24px",
};

const details = {
    backgroundColor: "#f8fafc",
    borderRadius: "10px",
    padding: "16px 20px",
    margin: "24px 0",
};

const row = {
    color: "#334155",
    fontSize: "14px",
    margin: "7px 0",
};

const hr = {
    borderColor: "#e2e8f0",
    margin: "28px 0",
};

const footer = {
    color: "#64748b",
    fontSize: "13px",
};