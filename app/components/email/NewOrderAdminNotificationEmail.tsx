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
    customerEmail: string;
    orderNumber: string;
    hasContainer?: boolean;
};

export default function NewOrderAdminNotificationEmail({
    customerName,
    customerEmail,
    orderNumber,
    hasContainer = false,
}: Props) {
    return (
        <Html>
            <Head />

            <Preview>
                New KXH order received: #{orderNumber}
            </Preview>

            <Body style={body}>
                <Container style={container}>
                    <Text style={brand}>
                        KXH ADMIN
                    </Text>

                    <Heading style={heading}>
                        New Order Received
                    </Heading>

                    <Text style={intro}>
                        A new customer order has been successfully paid and confirmed.
                    </Text>

                    <Section style={details}>
                        <DetailRow
                            label="Order"
                            value={`#${orderNumber}`}
                        />

                        <DetailRow
                            label="Customer"
                            value={customerName || "Unknown Customer"}
                        />

                        <DetailRow
                            label="Email"
                            value={customerEmail || "Not provided"}
                        />
                    </Section>

                    {hasContainer && (
                        <Section style={notice}>
                            <Text style={noticeText}>
                                This order includes a container.
                            </Text>
                        </Section>
                    )}

                    <Hr style={hr} />

                    <Text style={footer}>
                        The customer receipt is attached for reference.
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
    maxWidth: "620px",
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
    marginBottom: "12px",
};

const intro = {
    color: "#64748b",
    fontSize: "15px",
    lineHeight: "24px",
};

const details = {
    marginTop: "24px",
};

const row = {
    borderBottom: "1px solid #f1f5f9",
    padding: "8px 0",
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

const notice = {
    backgroundColor: "#f0fdf4",
    border: "1px solid #bbf7d0",
    borderRadius: "10px",
    padding: "14px 16px",
    margin: "24px 0",
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