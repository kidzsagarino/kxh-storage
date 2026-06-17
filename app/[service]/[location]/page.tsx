import CrispChat from "@/app/components/chat/CrispChat";
import MainFooter from "@/app/components/footer/MainFooter";
import Nav from "@/app/components/MobileNav";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import TrustpilotPill from "@/app/components/trustpilot/TrustpilotPill";
import { londonLocations } from "@/app/lib/location";
import Link from "next/link";
import Image from "next/image";
import TrustpilotJsonLd from "@/app/components/seo/TrustPilotJsonLD";


type FAQ = {
    q: string;
    a: string;
};

const serviceContent = {
    "warehouse-storage-london": {
        label: "Warehouse Storage",
        quoteService: "storage",
        h1: (loc: string) =>
            `Storage Space to Rent in ${loc}, London with Pickup & Delivery`,
        intro: (loc: string) =>
            `Looking for storage space in ${loc}? KXH Logistics provides secure warehouse storage with collection, flexible storage terms, and return delivery across London.`,
        description:
            "Secure storage space to rent with pickup, managed warehouse storage, flexible terms, and return delivery.",
        benefits: [
            "Pickup & delivery",
            "Secure warehouse storage",
            "Short-term storage",
            "Long-term storage",
            "Business storage support",
        ],
        idealFor: [
            "Household storage",
            "Business stock",
            "Office equipment",
            "Moving or renovation storage",
            "Student storage",
            "Inventory overflow storage",
            "Temporary renter storage",
            "University accommodation moves",
        ],
        process: [
            "Book your storage quote online",
            "We collect your items from your location",
            "We store everything securely and deliver it back when needed",
        ],
        faqs: [
            {
                q: "Do you collect items for storage?",
                a: "Yes, we collect items from your location and store them securely in our managed warehouse storage system.",
            },
            {
                q: "Can I request my items back?",
                a: "Yes, you can request return delivery when you need your stored items back.",
            },
            {
                q: "Is this suitable for business storage?",
                a: "Yes, this service is suitable for households, students, offices, and businesses needing flexible storage.",
            },
            {
                q: "Do you offer storage and moving support for students?",
                a: "Yes, KXH Logistics supports students needing temporary storage, moving assistance, collection, and delivery during accommodation changes or university breaks across London.",
            },
        ],
    },

    "logistics-moving-london": {
        label: "Moving Service",
        quoteService: "moving",
        h1: (loc: string) => `Moving Services in ${loc}, London`,
        intro: (loc: string) =>
            `Moving in or around ${loc}? KXH Logistics provides fully managed moving services with packing, loading, transport, and delivery support.`,
        description:
            "Professional moving services with packing, transport, loading, and delivery support.",
        benefits: [
            "Home moves",
            "Office relocations",
            "Furniture transport",
            "Packing support",
            "Flexible scheduling",
        ],
        idealFor: [
            "Flat moves",
            "House moves",
            "Office relocations",
            "Furniture transport",
            "Student accommodation moves",
            "Apartment relocations",
            "Temporary relocations",
        ],
        process: [
            "Book your moving quote online",
            "Our team collects, packs, and loads your items",
            "We deliver everything safely to your new location",
        ],
        faqs: [
            {
                q: "Do you provide moving services near me?",
                a: "Yes, we provide moving services across London, including collection, transport, and delivery.",
            },
            {
                q: "Can you help with office moves?",
                a: "Yes, we support office and business relocations as well as home moves.",
            },
            {
                q: "Do I need to rent a van?",
                a: "No, we handle transport, loading, and delivery for you.",
            },
            {
                q: "Do you offer storage and moving support for students?",
                a: "Yes, KXH Logistics supports students needing temporary storage, moving assistance, collection, and delivery during accommodation changes or university breaks across London.",
            },
        ],
    },

    "shredding-solutions-london": {
        label: "Document Shredding",
        quoteService: "shredding",
        h1: (loc: string) => `Secure Document Shredding in ${loc}, London`,
        intro: (loc: string) =>
            `Need confidential document shredding in ${loc}? KXH Logistics provides secure collection, certified destruction, and compliant document disposal across London.`,
        description:
            "Confidential document shredding with secure collection and certified destruction.",
        benefits: [
            "Secure collection",
            "Confidential shredding",
            "Certificate of destruction",
            "Business shredding",
            "Compliant disposal",
        ],
        idealFor: [
            "Office records",
            "Legal documents",
            "Financial paperwork",
            "Personal files",
            "Business archive clearouts",
        ],
        process: [
            "Book your shredding quote online",
            "We securely collect your documents",
            "Documents are destroyed and handled confidentially",
        ],
        faqs: [
            {
                q: "Do you collect documents for shredding?",
                a: "Yes, we collect documents securely and arrange confidential shredding.",
            },
            {
                q: "Do you provide a certificate of destruction?",
                a: "Yes, a certificate of destruction can be provided after shredding.",
            },
            {
                q: "Is this suitable for businesses?",
                a: "Yes, it is suitable for offices, businesses, legal firms, financial records, and personal documents.",
            },
        ],
    },
    "business-storage-london": {
        label: "Business Storage",
        quoteService: "storage",
        h1: (loc: string) => `Business Storage in ${loc}, London`,
        intro: (loc: string) =>
            `Need flexible business storage in ${loc}? KXH Logistics provides managed storage for stock, equipment, documents, and office items with pickup and delivery across London.`,
        description:
            "Flexible business storage with pickup, delivery, secure handling, and inventory support.",
        benefits: [
            "Business stock storage",
            "Pickup & delivery",
            "Inventory support",
            "Office equipment storage",
            "Flexible storage terms",
        ],
        idealFor: [
            "Business inventory",
            "Office furniture",
            "Retail stock",
            "Ecommerce stock",
            "Archive storage",
            "Temporary storage during relocation",
        ],
        process: [
            "Book your business storage quote online",
            "We collect your items from your business location",
            "We store everything securely and deliver it back when needed",
        ],
        faqs: [
            {
                q: "Do you offer business storage with collection?",
                a: "Yes, we collect business items, stock, equipment, and documents for secure storage.",
            },
            {
                q: "Can you store business inventory?",
                a: "Yes, our storage service can support business inventory, retail stock, office items, and archive storage.",
            },
            {
                q: "Do you deliver items back when needed?",
                a: "Yes, return delivery can be arranged when you need your stored items back.",
            },
        ],
    },

    "inventory-management-london": {
        label: "Inventory Management",
        quoteService: "storage",
        h1: (loc: string) => `Inventory Management Storage in ${loc}, London`,
        intro: (loc: string) =>
            `Need storage with inventory support in ${loc}? KXH Logistics helps businesses store, track, and manage items with collection and delivery across London.`,
        description:
            "Inventory-managed storage with collection, secure handling, item tracking, and delivery support.",
        benefits: [
            "Inventory tracking",
            "Managed storage",
            "Pickup & delivery",
            "Business stock support",
            "Item handling",
        ],
        idealFor: [
            "Ecommerce stock",
            "Retail inventory",
            "Office assets",
            "Event equipment",
            "Business supplies",
            "Temporary inventory overflow",
        ],
        process: [
            "Book your inventory storage quote online",
            "We collect and handle your items",
            "Your items are stored securely and can be delivered when requested",
        ],
        faqs: [
            {
                q: "Do you offer storage with inventory tracking?",
                a: "Yes, KXH Logistics supports managed storage for businesses that need item tracking and organized inventory handling.",
            },
            {
                q: "Is this suitable for ecommerce stock?",
                a: "Yes, this service is suitable for ecommerce stock, retail goods, office assets, and business supplies.",
            },
            {
                q: "Can you collect and deliver inventory?",
                a: "Yes, we can collect items for storage and arrange delivery when needed.",
            },
        ],
    },

    "pallet-storage-london": {
        label: "Pallet Storage",
        quoteService: "storage",
        h1: (loc: string) => `Pallet Storage in ${loc}, London`,
        intro: (loc: string) =>
            `Need pallet storage in ${loc}? KXH Logistics provides managed pallet storage for businesses with collection, warehouse handling, and delivery support across London.`,
        description:
            "Business pallet storage with collection, warehouse handling, secure storage, and delivery support.",
        benefits: [
            "Pallet storage",
            "Warehouse handling",
            "Business storage",
            "Pickup & delivery",
            "Flexible support",
        ],
        idealFor: [
            "Palletised goods",
            "Retail stock",
            "Wholesale inventory",
            "Business supplies",
            "Commercial storage",
        ],
        process: [
            "Book your pallet storage quote online",
            "We arrange collection and warehouse handling",
            "Your pallets are stored securely and delivered when needed",
        ],
        faqs: [
            {
                q: "Do you provide pallet storage in London?",
                a: "Yes, KXH Logistics provides managed pallet storage for businesses across London.",
            },
            {
                q: "Can you collect palletised goods?",
                a: "Yes, collection and delivery support can be arranged for palletised goods.",
            },
            {
                q: "Is pallet storage suitable for retail or wholesale stock?",
                a: "Yes, pallet storage is suitable for retail stock, wholesale inventory, and commercial goods.",
            },
        ],
    },

    "commercial-storage-london": {
        label: "Commercial Storage",
        quoteService: "storage",
        h1: (loc: string) => `Commercial Storage in ${loc}, London`,
        intro: (loc: string) =>
            `Need commercial storage in ${loc}? KXH Logistics provides managed storage for businesses, offices, stock, equipment, and commercial items with pickup and delivery.`,
        description:
            "Commercial storage for businesses with secure handling, pickup, delivery, and flexible warehouse support.",
        benefits: [
            "Commercial storage",
            "Business storage",
            "Secure warehouse handling",
            "Pickup & delivery",
            "Flexible terms",
        ],
        idealFor: [
            "Office storage",
            "Business stock",
            "Commercial equipment",
            "Retail items",
            "Archive storage",
        ],
        process: [
            "Book your commercial storage quote online",
            "We collect your business or commercial items",
            "We store them securely and arrange delivery when needed",
        ],
        faqs: [
            {
                q: "Do you offer commercial storage in London?",
                a: "Yes, KXH Logistics provides commercial storage for businesses across London.",
            },
            {
                q: "Can you store office equipment and business stock?",
                a: "Yes, we can support office equipment, stock, archives, and commercial items.",
            },
            {
                q: "Do you provide pickup and delivery?",
                a: "Yes, pickup and return delivery can be arranged as part of the storage service.",
            },
        ],
    },
    "third-party-logistics-london": {
        label: "Third Party Logistics",
        quoteService: "storage",
        h1: (loc: string) =>
            `Third Party Logistics in ${loc}, London`,
        intro: (loc: string) =>
            `Need third party logistics support in ${loc}? KXH Logistics provides 3PL warehouse support, inventory handling, pallet storage, collection, and delivery coordination across London.`,
        description:
            "Third party logistics support with warehouse storage, inventory handling, pallet coordination, collection, and delivery.",
        benefits: [
            "3PL warehouse support",
            "Inventory handling",
            "Pallet coordination",
            "Collection & delivery",
            "Business logistics support",
        ],
        idealFor: [
            "Ecommerce businesses",
            "Retail inventory",
            "Palletised goods",
            "Warehouse overflow",
            "Business stock",
            "Commercial logistics",
        ],
        process: [
            "Book your third party logistics quote online",
            "We collect, handle, and coordinate your inventory",
            "Your stock is stored securely and delivered when needed",
        ],
        faqs: [
            {
                q: "Do you offer third party logistics in London?",
                a: "Yes, KXH Logistics provides third party logistics support across London including warehouse storage, inventory handling, pallet coordination, collection, and delivery.",
            },
            {
                q: "Is this suitable for ecommerce businesses?",
                a: "Yes, our 3PL support is suitable for ecommerce sellers, retailers, and businesses needing flexible warehouse and inventory support.",
            },
            {
                q: "Can you support pallet storage and delivery?",
                a: "Yes, we can support pallet storage, warehouse handling, and delivery coordination for business stock and commercial goods.",
            },
        ],
    },
} as const;

type ServiceSlug = keyof typeof serviceContent;

type BoroughContent = {
    localIntro: string;
    localUseCase: string;
};

const boroughContent: Record<string, Partial<Record<ServiceSlug, BoroughContent>>> = {
    camden: {
        "warehouse-storage-london": {
            localIntro:
                "Looking for storage space in Camden? KXH Logistics provides secure warehouse storage with collection and delivery for students, renters, households, and businesses across Camden and surrounding areas.",
            localUseCase:
                "Many Camden customers use our service during flat moves, university accommodation changes, property renovations, business relocations, and temporary storage needs. Collection and return delivery make storage easier without hiring a van or visiting a storage facility.",
        },
        "business-storage-london": {
            localIntro:
                "Businesses in Camden use our managed storage solutions for retail stock, ecommerce inventory, office equipment, and overflow business storage.",
            localUseCase:
                "This works well for creative agencies, independent shops, market sellers, and small businesses that need flexible storage with collection and delivery.",
        },
        "inventory-management-london": {
            localIntro:
                "KXH Logistics helps Camden businesses organise stored inventory with secure warehouse handling and flexible return delivery support.",
            localUseCase:
                "This is suitable for ecommerce sellers, retail stock, event items, and business supplies that need organised storage rather than basic self storage.",
        },
        "pallet-storage-london": {
            localIntro:
                "Our Camden pallet storage support is suitable for businesses storing palletised retail goods, wholesale stock, and commercial inventory.",
            localUseCase:
                "It is ideal for businesses that need warehouse support without committing to a large commercial unit.",
        },
        "commercial-storage-london": {
            localIntro:
                "Commercial clients in Camden use our warehouse storage services for office furniture, business equipment, stock holding, and flexible overflow storage.",
            localUseCase:
                "This supports local offices, shops, agencies, and growing businesses that need extra space without managing transport themselves.",
        },
        "logistics-moving-london": {
            localIntro:
                "Our Camden moving services support apartment relocations, student moves, office transport, and furniture delivery throughout North and Central London.",
            localUseCase:
                "This is useful for students, renters, and customers moving between flats, student accommodation, offices, or temporary storage.",
        },
        "shredding-solutions-london": {
            localIntro:
                "Camden businesses rely on our confidential document shredding services for secure disposal of office paperwork, archived records, and sensitive documents.",
            localUseCase:
                "This is suitable for agencies, offices, landlords, legal teams, and businesses clearing old records.",
        },
    },

    westminster: {
        "warehouse-storage-london": {
            localIntro:
                "Westminster customers use our managed warehouse storage for office furniture, commercial stock, archive storage, student storage, and temporary business storage.",
            localUseCase:
                "This is helpful during office moves, refurbishments, student accommodation changes, event preparation, and short-term space issues in Central London.",
        },
        "business-storage-london": {
            localIntro:
                "Businesses in Westminster use our storage solutions to manage office assets, stock overflow, event equipment, and business inventory.",
            localUseCase:
                "This supports offices, professional services, retailers, and organisations needing secure collection and delivery.",
        },
        "inventory-management-london": {
            localIntro:
                "Our inventory-managed storage services help Westminster businesses organise stored items, equipment, and commercial inventory.",
            localUseCase:
                "This is useful for companies that need item visibility and structured warehouse support.",
        },
        "pallet-storage-london": {
            localIntro:
                "Westminster pallet storage solutions support suppliers, commercial businesses, and retailers needing secure warehouse storage for palletised goods.",
            localUseCase:
                "This helps businesses manage stock without relying on expensive central premises.",
        },
        "commercial-storage-london": {
            localIntro:
                "Commercial storage in Westminster is ideal for businesses needing secure warehouse space for office assets, equipment, and stock overflow.",
            localUseCase:
                "This works well for businesses managing office changes, stock holding, or temporary storage needs.",
        },
        "logistics-moving-london": {
            localIntro:
                "KXH Logistics supports Westminster home moves, student moves, office relocations, and furniture transport with flexible scheduling and professional handling.",
            localUseCase:
                "This is useful for students, renters, and Central London moves where access, timing, and handling need to be carefully managed.",
        },
        "shredding-solutions-london": {
            localIntro:
                "Westminster businesses use our secure shredding services for confidential paperwork disposal, archive destruction, and compliant document handling.",
            localUseCase:
                "This supports offices, finance teams, legal firms, and organisations handling sensitive records.",
        },
    },

    hackney: {
        "warehouse-storage-london": {
            localIntro:
                "Customers in Hackney use our warehouse storage services for business inventory, apartment storage, student storage, furniture holding, and flexible collection and delivery.",
            localUseCase:
                "This suits startups, creatives, students, renters, and small businesses needing extra space.",
        },

        "business-storage-london": {
            localIntro:
                "Hackney startups and growing businesses use our commercial storage services for stock management, retail inventory, and overflow business storage.",
            localUseCase:
                "This is useful for ecommerce brands, studios, and independent businesses with changing storage needs.",
        },
        "inventory-management-london": {
            localIntro:
                "Our inventory storage services help Hackney businesses organise ecommerce stock, business supplies, and stored inventory.",
            localUseCase:
                "This supports online retail, creative businesses, and local operators needing structured storage.",
        },
        "pallet-storage-london": {
            localIntro:
                "Businesses in Hackney use our pallet storage solutions for commercial goods, warehouse overflow, and palletised inventory.",
            localUseCase:
                "This is helpful for stock overflow, supplier deliveries, and growing business operations.",
        },
        "commercial-storage-london": {
            localIntro:
                "Commercial storage in Hackney supports businesses needing secure warehouse space for office furniture, inventory, retail stock, and operational equipment.",
            localUseCase:
                "This helps local businesses avoid overcrowded offices or expensive extra premises.",
        },
        "logistics-moving-london": {
            localIntro:
                "Our Hackney moving services support apartment relocations, student moves, furniture delivery, office moves, and flexible transport solutions across London.",
            localUseCase:
                "This is useful for students, renters, offices, and businesses moving items across East and Central London.",
        },
        "shredding-solutions-london": {
            localIntro:
                "Hackney businesses use our document shredding services to securely dispose of sensitive files, office records, and archived paperwork.",
            localUseCase:
                "This supports offices, agencies, studios, and businesses clearing confidential records.",
        },
    },

    islington: {
        "warehouse-storage-london": {
            localIntro:
                "Islington customers use our managed warehouse storage services during home moves, student moves, renovations, office clearouts, and temporary storage needs.",
            localUseCase:
                "This is suitable for students, renters, households, offices, and businesses needing collection and delivery included.",
        },
        "business-storage-london": {
            localIntro:
                "Businesses in Islington use our flexible business storage for office furniture, retail stock, archived documents, and commercial inventory.",
            localUseCase:
                "This helps local businesses manage stock and space without arranging separate transport.",
        },
        "inventory-management-london": {
            localIntro:
                "Our inventory-managed storage solutions help Islington businesses organise stock, supplies, and stored items with collection and delivery support.",
            localUseCase:
                "This works well for businesses that need organised storage rather than simple unit rental.",
        },
        "pallet-storage-london": {
            localIntro:
                "KXH Logistics provides pallet storage support in Islington for commercial goods, wholesale inventory, and warehouse overflow storage.",
            localUseCase:
                "This is useful for businesses needing flexible pallet handling and secure storage.",
        },
        "commercial-storage-london": {
            localIntro:
                "Commercial storage services in Islington are suitable for office relocations, equipment storage, and flexible warehouse support for businesses.",
            localUseCase:
                "This helps companies store items during moves, refurbishments, or stock overflow periods.",
        },
        "logistics-moving-london": {
            localIntro:
                "Our Islington moving services support flat moves, student accommodation moves, office relocations, furniture transport, and flexible moving assistance across London.",
            localUseCase:
                "This is useful for students, renters, residential moves, and business moves requiring professional handling.",
        },
        "shredding-solutions-london": {
            localIntro:
                "Businesses in Islington use our confidential shredding services for secure disposal of archived paperwork and sensitive office documents.",
            localUseCase:
                "This supports offices, professional services, and businesses clearing old records securely.",
        },
    },

    "kensington-chelsea": {
        "warehouse-storage-london": {
            localIntro:
                "Customers in Kensington and Chelsea use our warehouse storage services during property renovations, student moves, relocations, and temporary storage situations.",
            localUseCase:
                "This is useful for students, renters, households, and businesses that need careful handling, secure storage, and return delivery.",
        },
        "business-storage-london": {
            localIntro:
                "Businesses in Kensington and Chelsea use our flexible storage services for office assets, inventory, and secure commercial storage support.",
            localUseCase:
                "This helps local businesses manage stock, equipment, and archive storage without extra premises.",
        },
        "inventory-management-london": {
            localIntro:
                "Our inventory-managed storage helps businesses in Kensington and Chelsea organise stock, assets, and stored commercial items efficiently.",
            localUseCase:
                "This is suitable for retailers, offices, and businesses needing item-level organisation.",
        },
        "pallet-storage-london": {
            localIntro:
                "KXH Logistics provides pallet storage services for retail inventory, commercial goods, and warehouse overflow in Kensington and Chelsea.",
            localUseCase:
                "This supports businesses needing secure pallet storage with collection and delivery support.",
        },
        "commercial-storage-london": {
            localIntro:
                "Commercial clients in Kensington and Chelsea use our warehouse solutions for office equipment, business inventory, and temporary commercial storage.",
            localUseCase:
                "This works well during refurbishments, relocations, and space management projects.",
        },
        "logistics-moving-london": {
            localIntro:
                "Our moving services in Kensington and Chelsea support apartment relocations, student moves, office moves, and furniture transport with professional handling.",
            localUseCase:
                "This is useful for students, renters, and customers needing managed transport and careful item handling.",
        },
        "shredding-solutions-london": {
            localIntro:
                "Businesses in Kensington and Chelsea use our secure shredding services for confidential paperwork, archived files, and office record disposal.",
            localUseCase:
                "This supports offices, landlords, professional services, and businesses clearing sensitive documents.",
        },
    },

    "tower-hamlets": {
        "warehouse-storage-london": {
            localIntro:
                "Tower Hamlets businesses, students, and renters use our warehouse storage services for ecommerce inventory, commercial stock, furniture storage, and flexible warehouse support.",
            localUseCase:
                "This is useful for businesses, students, and renters around East London needing storage with collection and delivery.",
        },
        "business-storage-london": {
            localIntro:
                "Businesses in Tower Hamlets use our managed storage services for ecommerce products, retail inventory, office equipment, and operational stock.",
            localUseCase:
                "This supports startups, online sellers, and growing businesses needing flexible space.",
        },
        "inventory-management-london": {
            localIntro:
                "Our inventory-managed storage services support Tower Hamlets businesses needing organised warehouse storage for inventory, supplies, and commercial goods.",
            localUseCase:
                "This is ideal for ecommerce operations and businesses managing regular stock movement.",
        },
        "pallet-storage-london": {
            localIntro:
                "Tower Hamlets pallet storage services are suitable for businesses handling palletised goods, wholesale stock, and commercial inventory.",
            localUseCase:
                "This helps businesses store larger volumes of stock without managing their own warehouse.",
        },
        "commercial-storage-london": {
            localIntro:
                "Commercial storage in Tower Hamlets supports growing businesses requiring secure warehouse space for stock, equipment, and operational storage.",
            localUseCase:
                "This works well for businesses needing practical storage with logistics support.",
        },
        "logistics-moving-london": {
            localIntro:
                "KXH Logistics supports Tower Hamlets relocations with managed moving services for students, homes, offices, furniture, and commercial equipment.",
            localUseCase:
                "This is useful for students, renters, and customers moving between apartments, offices, student accommodation, and commercial spaces.",
        },
        "shredding-solutions-london": {
            localIntro:
                "Businesses in Tower Hamlets use our confidential shredding services for secure disposal of financial records, archived files, and sensitive documents.",
            localUseCase:
                "This supports offices, ecommerce businesses, and professional services handling private records.",
        },
    },

    southwark: {
        "warehouse-storage-london": {
            localIntro:
                "Southwark customers use our warehouse storage services for business stock, student storage, household storage, office equipment, and temporary storage support.",
            localUseCase:
                "This is useful during student moves, flat moves, renovations, business changes, and stock overflow periods.",
        },
        "business-storage-london": {
            localIntro:
                "Businesses in Southwark use our commercial storage solutions for inventory overflow, office furniture, and secure warehouse support.",
            localUseCase:
                "This helps businesses manage extra stock and equipment without renting larger premises.",
        },
        "inventory-management-london": {
            localIntro:
                "Our inventory management storage services help Southwark businesses organise stored stock, supplies, and commercial inventory efficiently.",
            localUseCase:
                "This works well for companies needing structured storage and delivery support.",
        },
        "pallet-storage-london": {
            localIntro:
                "Southwark pallet storage support is suitable for retail goods, commercial stock, and warehouse overflow storage.",
            localUseCase:
                "This helps businesses store palletised goods securely while keeping delivery options flexible.",
        },
        "commercial-storage-london": {
            localIntro:
                "Commercial clients in Southwark use our warehouse storage services for office assets, archived items, and flexible business storage.",
            localUseCase:
                "This is suitable for offices, shops, and service businesses needing extra space.",
        },
        "logistics-moving-london": {
            localIntro:
                "Our Southwark moving services support student moves, flat moves, office relocations, and furniture transport throughout London.",
            localUseCase:
                "This is useful for students, renters, residential moves, office changes, and furniture deliveries.",
        },
        "shredding-solutions-london": {
            localIntro:
                "Southwark businesses use our shredding services for secure disposal of archived records, office paperwork, and confidential files.",
            localUseCase:
                "This supports offices, landlords, finance teams, and professional services.",
        },
    },

    lambeth: {
        "warehouse-storage-london": {
            localIntro:
                "Customers in Lambeth use our warehouse storage services for student storage, home storage, office clearouts, temporary storage, and business inventory support.",
            localUseCase:
                "This is helpful for students, renters, households, and businesses needing secure storage with collection and return delivery.",
        },
        "business-storage-london": {
            localIntro:
                "Businesses in Lambeth use our managed storage services for stock holding, office furniture, archived documents, and commercial inventory.",
            localUseCase:
                "This helps local businesses handle overflow storage without managing transport separately.",
        },
        "inventory-management-london": {
            localIntro:
                "Our inventory-managed storage helps Lambeth businesses organise inventory, stock, and operational supplies through secure warehouse support.",
            localUseCase:
                "This is useful for retailers, ecommerce sellers, and companies with changing storage needs.",
        },
        "pallet-storage-london": {
            localIntro:
                "KXH Logistics provides pallet storage services in Lambeth for commercial goods, wholesale inventory, and warehouse overflow storage.",
            localUseCase:
                "This supports businesses storing larger stock volumes or palletised deliveries.",
        },
        "commercial-storage-london": {
            localIntro:
                "Commercial storage in Lambeth supports businesses needing secure warehouse space for equipment, inventory, archived records, and office furniture.",
            localUseCase:
                "This is useful during relocations, office changes, and stock overflow periods.",
        },
        "logistics-moving-london": {
            localIntro:
                "Our Lambeth moving services support student moves, apartment relocations, office transport, furniture delivery, and flexible moving assistance.",
            localUseCase:
                "This helps students, renters, households, and businesses move items safely across London.",
        },
        "shredding-solutions-london": {
            localIntro:
                "Businesses in Lambeth use our secure shredding services for confidential paperwork, archived office records, and sensitive document disposal.",
            localUseCase:
                "This supports companies clearing old files while protecting confidential information.",
        },
    },
};

const serviceImages = {
    "warehouse-storage-london": "/images/location-service/warehouse-storage-location.webp",
    "business-storage-london": "/images/location-service/business-storage-location.webp",
    "inventory-management-london": "/images/location-service/inventory-management-location.webp",
    "pallet-storage-london": "/images/location-service/pallet-storage-location.webp",
    "commercial-storage-london": "/images/location-service/business-storage-location.webp",
    "third-party-logistics-london": "/images/location-service/third-party-logistics-location.webp",
    "logistics-moving-london": "/images/location-service/moving-services-location.webp",
    "shredding-solutions-london": "/images/location-service/document-shredding-location.webp",
};

export async function generateStaticParams() {
    const services = Object.keys(serviceContent) as ServiceSlug[];

    return services.flatMap((service) =>
        londonLocations.map((loc) => ({
            service,
            location: loc.slug,
        }))
    );
}

export async function generateMetadata({ params }: any) {
    const { service, location } = await params;
    const loc = londonLocations.find((l) => l.slug === location);
    const content = serviceContent[service as ServiceSlug];

    const locName = loc?.name ?? "London";

    const titleMap: Partial<Record<ServiceSlug, string>> = {
        "inventory-management-london":
            `Inventory Management & Storage in ${locName}, London | KXH Logistics`,

        "pallet-storage-london":
            `Pallet Storage in ${locName}, London | Collection & Delivery | KXH`,

        "business-storage-london":
            `Business Storage in ${locName}, London | Secure Managed Storage | KXH`,

        "commercial-storage-london":
            `Commercial Storage in ${locName}, London | Business Warehouse Support | KXH`,

        "warehouse-storage-london":
            location === "camden"
                ? `Storage Camden | Storage Space to Rent in Camden London | KXH`
                : `Storage Space to Rent in ${locName}, London | Pickup & Delivery | KXH`,
        "logistics-moving-london":
            `Moving Services in ${locName}, London | Business & Home Moves | KXH`,

        "shredding-solutions-london":
            `Document Shredding in ${locName}, London | Secure Collection | KXH`,
        "third-party-logistics-london":
            `Third Party Logistics in ${locName}, London | 3PL Warehouse Support | KXH`,
    };

    const descriptionMap: Partial<Record<ServiceSlug, string>> = {
        "inventory-management-london":
            `Managed inventory storage in ${locName}, London with item tracking, collection, warehouse handling, and delivery support for businesses.`,

        "pallet-storage-london":
            `Flexible pallet storage in ${locName}, London with warehouse handling, collection, secure storage, and delivery support for businesses.`,

        "business-storage-london":
            `Secure business storage in ${locName}, London with collection, delivery, inventory support, and flexible warehouse storage solutions.`,

        "commercial-storage-london":
            `Commercial warehouse storage in ${locName}, London for office equipment, stock, inventory, and business storage needs.`,

        "warehouse-storage-london":
            location === "camden"
                ? `Looking for storage in Camden? KXH provides secure storage space with collection and delivery for students, renters, households, and businesses across Camden.`
                : `Secure storage space to rent in ${locName}, London with pickup, managed warehouse storage, flexible terms, and return delivery support for businesses, students, and renters.`,
        "logistics-moving-london":
            `Professional moving services in ${locName}, London for homes, offices, furniture, and business relocations.`,

        "shredding-solutions-london":
            `Secure document shredding in ${locName}, London with confidential collection and compliant disposal support.`,
        "third-party-logistics-london":
            `Third party logistics in ${locName}, London with 3PL warehouse support, inventory handling, pallet storage, collection, and delivery coordination.`,
    };

    return {
        title:
            titleMap[service as ServiceSlug] ??
            `${content.label} in ${locName}, London | KXH Logistics`,
        description:
            descriptionMap[service as ServiceSlug] ??
            `${content.description} Available in ${locName}, London with simple booking and instant pricing.`, alternates: {
                canonical: `https://kxhlogistics.co.uk/${service}/${location}`,
            },
    };
}

function JsonLd({
    serviceLabel,
    locationName,
    description,
}: {
    serviceLabel: string;
    locationName: string;
    description: string;
}) {
    const data = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${serviceLabel} in ${locationName}, London`,
        serviceType: serviceLabel,
        areaServed: `${locationName}, London`,
        description,
        provider: {
            "@type": "LocalBusiness",
            name: "KXH Storage & Logistics",
            url: "https://kxhlogistics.co.uk",
            telephone: "+44 1474 396663",
        },
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function FAQJsonLd({
    faqs,
}: { faqs: readonly FAQ[] }) {
    const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: {
                "@type": "Answer",
                text: faq.a,
            },
        })),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function Breadcrumbs({
    service,
    location,
    serviceLabel,
}: {
    service: string;
    location: {
        slug: string;
        name: string;
    };
    serviceLabel: string;
}) {
    const breadcrumbs = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: serviceLabel, href: `/${service}` },
        { name: location.name, href: `/${service}/${location.slug}` },
    ];

    const jsonLd = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: breadcrumbs.map((b, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: b.name,
            item: `https://kxhlogistics.co.uk${b.href}`,
        })),
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(jsonLd),
                }}
            />

            <nav className="max-w-6xl mx-auto px-4 pt-6 text-sm text-slate-500">
                <ol className="flex flex-wrap items-center gap-2">
                    {breadcrumbs.map((b, i) => (
                        <li key={b.href} className="flex items-center gap-2">
                            {i < breadcrumbs.length - 1 ? (
                                <Link href={b.href} className="hover:underline text-emerald-700">
                                    {b.name}
                                </Link>
                            ) : (
                                <span className="text-slate-700 font-medium">{b.name}</span>
                            )}

                            {i < breadcrumbs.length - 1 && (
                                <span className="text-slate-300">/</span>
                            )}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}

export default async function LocationServicePage({ params }: any) {
    const { service, location } = await params;

    const loc = londonLocations.find((l) => l.slug === location);
    const content = serviceContent[service as ServiceSlug];

    const localContent =
        boroughContent[location]?.[service as ServiceSlug];

    if (!content || !loc) {
        return null;
    }

    return (
        <>
            <CrispChat />
            <Nav />

            <Breadcrumbs
                service={service}
                location={loc}
                serviceLabel={content.label}
            />

            <main className="min-h-screen bg-white text-slate-900">
                <JsonLd
                    serviceLabel={content.label}
                    locationName={loc.name}
                    description={content.description}
                />
                <FAQJsonLd faqs={content.faqs} />
                <TrustpilotJsonLd />
                <section className="relative bg-gradient-to-b from-slate-50 to-white py-20 lg:py-24">
                    <div className="max-w-5xl mx-auto px-4 text-center">
                        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-700">
                            <span className="h-2 w-2 rounded-full bg-emerald-500" />
                            {content.label} in {loc.name}
                        </div>

                        <h1 className="mt-6 text-4xl font-black sm:text-5xl lg:text-6xl leading-tight tracking-tight">
                            {content.h1(loc.name)}
                        </h1>

                        <p className="mt-5 text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
                            {content.intro(loc.name)}
                        </p>

                        <div className="mt-8">
                            <Link
                                href={`/?service=${content.quoteService}#pricing`}
                                className="inline-block rounded-xl bg-emerald-700 px-6 py-3 text-white font-semibold shadow-lg hover:bg-emerald-700 transition"
                            >
                                Get Instant Quote
                            </Link>
                        </div>
                        <div className="mt-6 flex justify-center">
                            <TrustpilotPill />
                        </div>
                        <Image
                            src={serviceImages[service as ServiceSlug]}
                            alt={`${content.label} in ${loc.name}, London`}
                            width={1200}
                            height={700}
                            className="mt-10 rounded-2xl shadow-xl"
                            priority
                        />
                    </div>
                </section>

                <section className="border-y border-slate-200 bg-white">
                    <div className="max-w-5xl mx-auto px-4 py-6 flex flex-wrap justify-center gap-3 text-sm text-slate-600">
                        {content.benefits.map((item) => (
                            <span key={item} className="rounded-full border px-4 py-2 bg-slate-50">
                                {item}
                            </span>
                        ))}
                    </div>
                </section>
                <section className="py-16 border-t border-slate-200/70 bg-slate-50">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-12 items-start">

                            <div>
                                <h2 className="text-3xl font-black leading-tight">
                                    {content.label} for businesses and customers in {loc.name}
                                </h2>

                                <p className="mt-5 text-slate-600 leading-relaxed">
                                    KXH Logistics supports customers across {loc.name} with
                                    flexible warehouse storage, logistics support, collection,
                                    transport, and delivery services tailored to changing
                                    business and household needs.
                                </p>

                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    Many customers in {loc.name} use our services during
                                    office relocations, ecommerce stock overflow, apartment
                                    moves, student accommodation changes, temporary storage
                                    periods, and commercial inventory management.
                                </p>

                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    Our managed approach helps customers avoid the stress of
                                    arranging separate transport, warehouse access, or
                                    self-managed storage while keeping collection and return
                                    delivery flexible across London.
                                </p>
                            </div>
                            <Image
                                src="/images/location-service/location-business-support.webp"
                                alt={`Business storage and logistics support in ${loc.name}`}
                                width={900}
                                height={700}
                                className="rounded-2xl shadow-lg"
                            />
                            <div className="rounded-2xl border border-slate-200 bg-white p-6">
                                <h3 className="text-xl font-bold">
                                    Common use cases in {loc.name}
                                </h3>

                                <ul className="mt-5 space-y-3 text-slate-700">
                                    <li>✔ Ecommerce inventory and retail stock storage</li>
                                    <li>✔ Office furniture and equipment storage</li>
                                    <li>✔ Student moves and temporary accommodation storage</li>
                                    <li>✔ Pallet storage and warehouse overflow support</li>
                                    <li>✔ Apartment and flat relocations</li>
                                    <li>✔ Archive storage and document handling</li>
                                    <li>✔ Business collection and return delivery services</li>
                                </ul>
                            </div>

                        </div>
                    </div>
                </section>
                <section className="py-16 bg-white border-t border-slate-200/70">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="text-center max-w-3xl mx-auto">
                            <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                Storage for Local Customers
                            </p>
                            <h2 className="mt-2 text-3xl font-black">
                                Storage for Students, Renters & Businesses in {loc.name}
                            </h2>
                            <p className="mt-4 text-slate-600">
                                KXH supports customers in {loc.name} who need flexible storage with
                                collection and return delivery, whether they are moving home, changing
                                student accommodation, storing business stock, or managing temporary space.
                            </p>
                        </div>

                        <div className="mt-10 grid md:grid-cols-3 gap-6">
                            {[
                                {
                                    title: "Student Storage",
                                    desc: `Useful for students in ${loc.name} needing storage during summer breaks, accommodation changes, or temporary moves.`,
                                },
                                {
                                    title: "Renter & Flat Move Storage",
                                    desc: `Ideal for renters in ${loc.name} who need short-term storage during flat moves, renovations, or delayed move-in dates.`,
                                },
                                {
                                    title: "Business Storage",
                                    desc: `Suitable for businesses in ${loc.name} storing stock, office equipment, ecommerce inventory, documents, or commercial items.`,
                                },
                            ].map((item) => (
                                <div
                                    key={item.title}
                                    className="rounded-2xl border border-slate-200 bg-slate-50 p-6"
                                >
                                    <h3 className="text-xl font-bold">{item.title}</h3>
                                    <p className="mt-3 text-slate-600">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                {service === "warehouse-storage-london" && (
                    <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                        <div className="max-w-6xl mx-auto px-4">
                            <h2 className="text-3xl font-black">
                                Why Customers Choose KXH Storage in {loc.name}
                            </h2>

                            <p className="mt-4 text-slate-600">
                                Finding storage in {loc.name} can be challenging due to limited space,
                                apartment living, student accommodation changes, business growth, and
                                temporary relocation needs. KXH simplifies storage with collection,
                                secure warehouse storage, and return delivery across London.
                            </p>

                            <div className="mt-8 grid md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="font-bold text-lg">
                                        Student Storage in {loc.name}
                                    </h3>
                                    <p className="mt-2 text-slate-600">
                                        Ideal for students moving between university accommodation,
                                        summer breaks, internships, and temporary housing.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        Business Storage in {loc.name}
                                    </h3>
                                    <p className="mt-2 text-slate-600">
                                        Flexible storage for stock, inventory, office equipment,
                                        documents, retail products, and ecommerce inventory.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        Flat Move & Household Storage
                                    </h3>
                                    <p className="mt-2 text-slate-600">
                                        Useful during delayed move-ins, renovations, downsizing,
                                        apartment relocations, and temporary storage needs.
                                    </p>
                                </div>

                                <div>
                                    <h3 className="font-bold text-lg">
                                        Storage with Collection & Delivery
                                    </h3>
                                    <p className="mt-2 text-slate-600">
                                        We collect, store, and return your items without requiring
                                        you to rent a van or visit a storage facility.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </section>
                )}
                <section className="py-16 max-w-6xl mx-auto px-4">
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        <div>
                            <h2 className="text-3xl font-black">
                                Local {content.label.toLowerCase()} support in {loc.name}
                            </h2>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                {localContent?.localIntro ??
                                    `KXH Logistics helps customers in ${loc.name} arrange reliable, fully managed ${content.label.toLowerCase()} without the stress of handling transport, storage, or logistics alone.`}
                            </p>

                            <p className="mt-4 text-slate-600 leading-relaxed">
                                {localContent?.localUseCase ??
                                    `Whether you are a household, student, office, or business, our team can collect, handle, and deliver your items through a simple quote-based process.`}
                            </p>
                            {(
                                service === "warehouse-storage-london" ||
                                service === "business-storage-london" ||
                                service === "commercial-storage-london"
                            ) && (
                                    <p className="mt-4 text-slate-600 leading-relaxed">
                                        Businesses needing organised stock handling can also use our{" "}
                                        <Link
                                            href={`/inventory-management-london/${loc.slug}`}
                                            className="text-emerald-700 hover:underline font-medium"
                                        >
                                            inventory management storage in {loc.name}
                                        </Link>
                                        {" "}for inventory tracking, warehouse handling, ecommerce stock support,
                                        pallet coordination, and flexible collection and delivery services across London.
                                    </p>
                                )}
                            {(
                                service === "warehouse-storage-london" ||
                                service === "inventory-management-london"
                            ) && (
                                    <p className="mt-4 text-slate-600 leading-relaxed">
                                        For larger commercial goods, wholesale inventory, and business stock overflow,
                                        use our{" "}
                                        <Link
                                            href={`/pallet-storage-london/${loc.slug}`}
                                            className="text-emerald-700 hover:underline font-medium"
                                        >
                                            pallet storage services in {loc.name}
                                        </Link>
                                        {" "}with warehouse handling, pallet coordination, secure storage,
                                        and flexible collection and delivery support.
                                    </p>
                                )}
                            {(
                                service === "warehouse-storage-london" ||
                                service === "inventory-management-london" ||
                                service === "pallet-storage-london" ||
                                service === "business-storage-london" ||
                                service === "commercial-storage-london"
                            ) && (
                                    <p className="mt-4 text-slate-600 leading-relaxed">
                                        Businesses requiring outsourced warehouse operations can also explore our{" "}
                                        <Link
                                            href={`/third-party-logistics-london/${loc.slug}`}
                                            className="text-emerald-700 hover:underline font-medium"
                                        >
                                            third party logistics services in {loc.name}
                                        </Link>
                                        {" "}for inventory coordination, pallet handling, fulfilment support,
                                        collection, and delivery support.
                                    </p>
                                )}
                            {(
                                service === "warehouse-storage-london" ||
                                service === "logistics-moving-london"
                            ) && (
                                    <p className="mt-4 text-slate-600 leading-relaxed">
                                        Our services are also suitable for students, renters, and temporary
                                        relocations needing flexible collection, storage, moving support,
                                        and return delivery across London.
                                    </p>
                                )}
                        </div>

                        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <Image
                                src="/images/location-service/location-storage-logistics-support.webp"
                                alt={`${content.label} support in ${loc.name}`}
                                width={900}
                                height={700}
                                className="rounded-2xl shadow-lg mb-6"
                            />
                            <h3 className="font-bold text-lg">Ideal for:</h3>
                            <ul className="mt-4 space-y-3 text-slate-700">
                                {content.idealFor.map((item) => (
                                    <li key={item}>✔ {item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-6xl mx-auto px-4">
                        <div className="grid lg:grid-cols-2 gap-10 items-center">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-wide text-emerald-700">
                                    Pickup & Return Delivery
                                </p>
                                <h2 className="mt-2 text-3xl font-black">
                                    We Collect, Store & Deliver in {loc.name}
                                </h2>
                                <p className="mt-4 text-slate-600 leading-relaxed">
                                    Instead of arranging transport and storage separately, KXH can collect
                                    your items from {loc.name}, store them securely, and return them when
                                    you need them back.
                                </p>

                                <ul className="mt-6 space-y-3 text-slate-700">
                                    <li>✔ Collection from homes, offices, student accommodation, and businesses</li>
                                    <li>✔ Secure managed warehouse storage</li>
                                    <li>✔ Flexible short-term or long-term storage</li>
                                    <li>✔ Return delivery available when needed</li>
                                </ul>
                            </div>

                            <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                                <h3 className="text-2xl font-black">
                                    No need to rent a van
                                </h3>
                                <p className="mt-4 text-slate-600">
                                    Our collection and delivery model makes storage easier for customers
                                    who do not want to move items into a storage unit themselves.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="py-16 bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-5xl mx-auto px-4">
                        <div className="text-center">
                            <h2 className="text-3xl font-black">
                                How it works in {loc.name}
                            </h2>

                            <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
                                A simple managed process from quote to collection, handling,
                                and delivery.
                            </p>
                        </div>

                        <div className="mt-10 grid md:grid-cols-3 gap-6">
                            {content.process.map((step, index) => (
                                <div
                                    key={step}
                                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
                                >
                                    <div className="text-2xl font-black text-emerald-700">
                                        {index + 1}
                                    </div>
                                    <p className="mt-3 text-sm text-slate-600">{step}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
                <section className="py-12 bg-white">
                    <div className="max-w-6xl mx-auto px-4">
                        <Image
                            src="/images/location-service/location-team-photo.webp"
                            alt="KXH Storage & Logistics team"
                            width={1400}
                            height={800}
                            className="rounded-3xl shadow-xl"
                        />
                    </div>
                </section>
                <TestimonialsSection />
                <section className="py-16 border-t border-slate-200/70 bg-white">
                    <div className="max-w-6xl mx-auto px-4">

                        <div className="text-center mb-10">
                            <h2 className="text-3xl font-black">
                                Explore related storage & logistics services
                            </h2>

                            <p className="mt-3 text-slate-600 max-w-2xl mx-auto">
                                KXH Logistics provides managed warehouse storage, inventory
                                management, pallet storage, commercial logistics, moving
                                services, and secure document shredding across London.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                            <Link
                                href="/warehouse-storage-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                            >
                                <h3 className="font-semibold">
                                    Warehouse Storage London
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    Managed warehouse storage with collection and delivery support.
                                </p>
                            </Link>

                            <Link
                                href="/business-storage-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                            >
                                <h3 className="font-semibold">
                                    Business Storage London
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    Flexible business storage for inventory, equipment, and office stock.
                                </p>
                            </Link>

                            <Link
                                href="/inventory-management-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                            >
                                <h3 className="font-semibold">
                                    Inventory Management London
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    Organised inventory storage with tracking and warehouse support.
                                </p>
                            </Link>

                            <Link
                                href="/pallet-storage-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                            >
                                <h3 className="font-semibold">
                                    Pallet Storage London
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    Secure pallet storage for retail, wholesale, and commercial stock.
                                </p>
                            </Link>

                            <Link
                                href="/commercial-storage-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                            >
                                <h3 className="font-semibold">
                                    Commercial Storage London
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    Commercial warehouse support for offices, stock, and equipment.
                                </p>
                            </Link>

                            <Link
                                href="/logistics-moving-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                            >
                                <h3 className="font-semibold">
                                    Moving Services London
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    Home, office, and student moving services across London.
                                </p>
                            </Link>

                            <Link
                                href="/shredding-solutions-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                            >
                                <h3 className="font-semibold">
                                    Document Shredding London
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    Secure collection and confidential document destruction services.
                                </p>
                            </Link>
                            <Link
                                href="/third-party-logistics-london"
                                className="rounded-2xl border border-slate-200 bg-slate-50 p-5 hover:border-emerald-300 hover:bg-white transition"
                            >
                                <h3 className="font-semibold">
                                    Third Party Logistics London
                                </h3>

                                <p className="mt-2 text-sm text-slate-600">
                                    3PL warehouse support including inventory handling,
                                    pallet storage, fulfilment support, and delivery coordination.
                                </p>
                            </Link>

                        </div>
                    </div>
                </section>

                <section className="py-20 text-center bg-slate-50 border-t border-slate-200/70">
                    <div className="max-w-3xl mx-auto px-4">
                        <h2 className="text-3xl font-black">
                            Need {content.label.toLowerCase()} in {loc.name}?
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Get a fast quote and let KXH Logistics handle collection,
                            transport, and service delivery.
                        </p>

                        <div className="mt-8">
                            <Link
                                href={`/?service=${content.quoteService}#pricing`}
                                className="inline-block bg-black text-white px-8 py-4 rounded-xl font-semibold hover:bg-slate-800 transition"
                            >
                                Get Instant Quote
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="bg-slate-50 py-14 border-t border-slate-200/70">
                    <div className="max-w-4xl mx-auto px-4">
                        <h2 className="text-2xl font-black mb-6 text-center">
                            Frequently Asked Questions
                        </h2>

                        <div className="space-y-3">
                            {content.faqs.map((faq) => (
                                <details
                                    key={faq.q}
                                    className="border border-slate-200 rounded-xl p-5 bg-white"
                                >
                                    <summary className="font-semibold cursor-pointer">
                                        {faq.q}
                                    </summary>
                                    <p className="mt-3 text-slate-600">{faq.a}</p>
                                </details>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="bg-white py-14 border-t border-slate-200/70">
                    <div className="max-w-5xl mx-auto px-4">
                        <h2 className="font-bold text-lg mb-3">Other areas we serve</h2>

                        <div className="flex flex-wrap gap-3">
                            {londonLocations.map((l) => (
                                <Link
                                    key={l.slug}
                                    href={`/${service}/${l.slug}`}
                                    className="text-emerald-700 hover:underline text-sm"
                                >
                                    {content.label} in {l.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </section>

                <MainFooter
                    locations={londonLocations}
                />
            </main>
        </>
    );
}