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

type Props = {
    customerName: string;
    orderNumber: string;
    hasContainer?: boolean;
};

export default function OrderReceiptEmail({
    customerName,
    orderNumber,
    hasContainer = false,
}: Props) {
    return (
        <Html>
            <Head />

            <Preview>
                Receipt for KXH order #{orderNumber}
            </Preview>

            <Body style={body}>
                <Container style={container}>
                    <Text style={brand}>
                        KXH STORAGE & LOGISTICS
                    </Text>

                    <Heading style={heading}>
                        Thank you for your order
                    </Heading>

                    <Text style={text}>
                        Hi {customerName || "there"},
                    </Text>

                    <Text style={text}>
                        We have successfully received your payment for order{" "}
                        <strong>#{orderNumber}</strong>.
                    </Text>

                    <Section style={details}>
                        <Text style={label}>
                            ORDER NUMBER
                        </Text>

                        <Text style={value}>
                            #{orderNumber}
                        </Text>
                    </Section>

                    {hasContainer && (
                        <Section style={notice}>
                            <Text style={noticeText}>
                                This order includes container storage.
                            </Text>
                        </Section>
                    )}

                    <Text style={text}>
                        Your official receipt is attached to this email.
                    </Text>

                    <Hr style={hr} />

                    <Text style={footer}>
                        Thank you for choosing KXH Storage & Logistics.
                    </Text>
                </Container>
            </Body>
        </Html>
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
    padding: "18px",
    margin: "24px 0",
};

const label = {
    color: "#64748b",
    fontSize: "11px",
    fontWeight: "700",
    letterSpacing: "1px",
    margin: "0 0 4px",
};

const value = {
    color: "#0f172a",
    fontSize: "18px",
    fontWeight: "700",
    margin: "0",
};

const notice = {
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "10px",
    padding: "14px 16px",
    margin: "20px 0",
};

const noticeText = {
    color: "#166534",
    fontSize: "13px",
    margin: "0",
};

const hr = {
    borderColor: "#e2e8f0",
    margin: "28px 0",
};

const footer = {
    color: "#94a3b8",
    fontSize: "12px",
};