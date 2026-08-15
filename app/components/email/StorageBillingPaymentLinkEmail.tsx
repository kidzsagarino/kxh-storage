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
    installmentNumber: string;
    installmentCount: string;
    amount: string;
    dueDate: string;
    paymentUrl: string;
};

export default function StorageBillingPaymentLinkEmail({
    customerName,
    orderNumber,
    installmentNumber,
    installmentCount,
    amount,
    dueDate,
    paymentUrl,
}: Props) {
    return (
        <Html>
            <Head />

            <Preview>
                KXH storage payment due - Month {installmentNumber} of {installmentCount}
            </Preview>

            <Body style={body}>
                <Container style={container}>
                    <Text style={brand}>
                        KXH STORAGE & LOGISTICS
                    </Text>

                    <Heading style={heading}>
                        Storage payment ready
                    </Heading>

                    <Text style={text}>
                        Hi {customerName || "there"},
                    </Text>

                    <Text style={text}>
                        Your next KXH Storage & Logistics payment is ready.
                    </Text>

                    <Section style={details}>
                        <DetailRow
                            label="Order"
                            value={`#${orderNumber}`}
                        />

                        <DetailRow
                            label="Installment"
                            value={`Month ${installmentNumber} of ${installmentCount}`}
                        />

                        <DetailRow
                            label="Amount"
                            value={amount}
                        />

                        <DetailRow
                            label="Due date"
                            value={dueDate}
                        />
                    </Section>

                    <Section style={buttonSection}>
                        <Button
                            href={paymentUrl}
                            style={button}
                        >
                            Pay securely online
                        </Button>
                    </Section>

                    <Text style={securityText}>
                        Payment is securely processed by Stripe. KXH does not
                        store your card details.
                    </Text>

                    <Text style={text}>
                        If you have already made this payment, please disregard
                        this email.
                    </Text>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Thank you,
                        <br />
                        KXH Storage & Logistics
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

const body = {
    backgroundColor: "#f1f5f9",
    fontFamily: "Arial, Helvetica, sans-serif",
    margin: "0",
    padding: "32px 12px",
};

const container = {
    backgroundColor: "#ffffff",
    border: "1px solid #e2e8f0",
    borderRadius: "12px",
    maxWidth: "600px",
    margin: "0 auto",
    padding: "32px",
};

const brand = {
    color: "#5A862C",
    fontSize: "12px",
    fontWeight: "700",
    letterSpacing: "1.2px",
    margin: "0 0 12px",
};

const heading = {
    color: "#0f172a",
    fontSize: "26px",
    fontWeight: "700",
    margin: "0 0 24px",
};

const text = {
    color: "#475569",
    fontSize: "15px",
    lineHeight: "24px",
};

const details = {
    backgroundColor: "#f8fafc",
    border: "1px solid #e2e8f0",
    borderRadius: "10px",
    padding: "8px 18px",
    margin: "24px 0",
};

const row = {
    borderBottom: "1px solid #e2e8f0",
    padding: "9px 0",
};

const rowLabel = {
    color: "#64748b",
    fontSize: "12px",
    margin: "0 0 3px",
};

const rowValue = {
    color: "#1e293b",
    fontSize: "14px",
    fontWeight: "600",
    margin: "0",
};

const buttonSection = {
    margin: "28px 0",
    textAlign: "center" as const,
};

const button = {
    backgroundColor: "#047857",
    borderRadius: "10px",
    color: "#ffffff",
    display: "inline-block",
    fontSize: "14px",
    fontWeight: "700",
    padding: "14px 22px",
    textDecoration: "none",
};

const securityText = {
    color: "#64748b",
    fontSize: "13px",
    lineHeight: "21px",
};

const hr = {
    borderColor: "#e2e8f0",
    margin: "28px 0",
};

const footer = {
    color: "#64748b",
    fontSize: "13px",
    lineHeight: "20px",
};