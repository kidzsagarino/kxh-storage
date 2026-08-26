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


type InventoryAccessEmailProps = {
    customerName: string;
    orderNumber: string;
    inventoryCount: number;
    inventoryUrl: string;
};


export default function InventoryAccessEmail({
    customerName,
    orderNumber,
    inventoryCount,
    inventoryUrl,
}: InventoryAccessEmailProps) {
    return (
        <Html>
            <Head />

            <Preview>
                Your KXH storage inventory is ready to view
            </Preview>

            <Body
                style={{
                    backgroundColor: "#f8fafc",
                    fontFamily:
                        "Arial, Helvetica, sans-serif",
                    margin: 0,
                    padding: "32px 16px",
                }}
            >
                <Container
                    style={{
                        maxWidth: "600px",
                        margin: "0 auto",
                        backgroundColor: "#ffffff",
                        borderRadius: "16px",
                        padding: "32px",
                        border:
                            "1px solid #e2e8f0",
                    }}
                >
                    <Heading
                        style={{
                            color: "#0f172a",
                            fontSize: "24px",
                            margin:
                                "0 0 20px",
                        }}
                    >
                        Your Stored Inventory
                    </Heading>

                    <Text
                        style={{
                            color: "#334155",
                            fontSize: "16px",
                            lineHeight: "24px",
                        }}
                    >
                        Hi{" "}
                        {customerName ||
                            "there"},
                    </Text>

                    <Text
                        style={{
                            color: "#334155",
                            fontSize: "16px",
                            lineHeight: "24px",
                        }}
                    >
                        Your KXH Storage & Logistics
                        inventory is now available to
                        view securely online.
                    </Text>

                    <Section
                        style={{
                            margin:
                                "24px 0",
                            padding:
                                "20px",
                            backgroundColor:
                                "#f8fafc",
                            borderRadius:
                                "12px",
                            border:
                                "1px solid #e2e8f0",
                        }}
                    >
                        <Text
                            style={{
                                margin:
                                    "0 0 8px",
                                color:
                                    "#475569",
                            }}
                        >
                            <strong>
                                Order:
                            </strong>{" "}
                            #{orderNumber}
                        </Text>

                        <Text
                            style={{
                                margin: 0,
                                color:
                                    "#475569",
                            }}
                        >
                            <strong>
                                Inventory items:
                            </strong>{" "}
                            {inventoryCount}
                        </Text>
                    </Section>

                    <Section
                        style={{
                            textAlign:
                                "center",
                            margin:
                                "28px 0",
                        }}
                    >
                        <Button
                            href={
                                inventoryUrl
                            }
                            style={{
                                backgroundColor:
                                    "#5A862C",
                                color:
                                    "#ffffff",
                                fontWeight:
                                    "bold",
                                padding:
                                    "14px 24px",
                                borderRadius:
                                    "10px",
                                textDecoration:
                                    "none",
                            }}
                        >
                            View My Inventory
                        </Button>
                    </Section>
                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: "14px",
                            lineHeight: "21px",
                        }}
                    >
                        This is your secure inventory access link.
                        Please keep this email for future reference.
                    </Text>

                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: "14px",
                            lineHeight: "21px",
                        }}
                    >
                        If you believe any inventory
                        information is incorrect, please
                        contact KXH Storage & Logistics.
                    </Text>

                    <Hr
                        style={{
                            borderColor:
                                "#e2e8f0",
                            margin:
                                "28px 0",
                        }}
                    />

                    <Text
                        style={{
                            color: "#64748b",
                            fontSize: "14px",
                        }}
                    >
                        Thank you,
                        <br />
                        KXH Storage & Logistics
                    </Text>
                </Container>
            </Body>
        </Html>
    );
}