import CrispChat from "@/app/components/chat/CrispChat";
import MainFooter from "@/app/components/footer/MainFooter";
import Nav from "@/app/components/MobileNav";
import TestimonialsSection from "@/app/components/TestimonialsSection";
import TrustpilotPill from "@/app/components/trustpilot/TrustpilotPill";
import { londonLocations } from "@/app/lib/location";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
                "Need storage space in Westminster? KXH Logistics provides secure managed warehouse storage with collection and return delivery for offices, students, renters, households, and commercial customers.",
            localUseCase:
                "Westminster customers use our storage service during office moves, refurbishments, student accommodation changes, event preparation, archive storage, and short-term space issues in Central London.",
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
                "Looking for storage space to rent in Hackney? KXH Logistics provides secure warehouse storage with collection and delivery for startups, renters, students, households, and businesses across Hackney and East London.",
            localUseCase:
                "Hackney customers use our storage service for ecommerce inventory, apartment moves, student storage, furniture holding, office equipment, and short-term overflow storage. Collection and return delivery make storage easier without hiring a van or visiting a storage unit.",
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
                "Looking for storage space in Kensington and Chelsea? KXH Logistics provides secure warehouse storage with collection, flexible terms, and return delivery for households, students, renters, and businesses.",
            localUseCase:
                "Customers in Kensington and Chelsea use our storage service during property renovations, student moves, relocations, furniture storage, household storage, and temporary business storage needs.",
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
                "Looking for secure storage space in Southwark? KXH Logistics provides managed warehouse storage with collection and delivery for business stock, student storage, household items, and office equipment.",
            localUseCase:
                "Southwark customers use our service for flat moves, business storage, ecommerce stock, office furniture, student accommodation changes, and temporary storage needs with convenient pickup and return delivery.",
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
                "Need storage space to rent in Lambeth? KXH Logistics provides secure warehouse storage with pickup, flexible storage terms, and return delivery for students, renters, households, and businesses.",
            localUseCase:
                "Lambeth customers use our storage service during student moves, flat moves, office clearouts, renovations, business stock overflow, and temporary storage periods. We collect, store, and return items when needed.",
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


const businessStorageIndustries = [
    {
        title: "Ecommerce Storage",
        href: "/ecommerce-storage-london",
        description:
            "Products, packaging materials, returned goods, seasonal inventory, and stock for online retailers.",
        available: true,
    },
    {
        title: "Retail Stock Storage",
        href: "/retail-stock-storage-london",
        description:
            "Overflow retail stock, seasonal collections, shop fittings, promotional displays, and merchandising equipment.",
        available: true,
    },
    {
        title: "Office Storage",
        href: "/office-storage-london",
        description:
            "Office furniture, IT equipment, archived documents, business assets, and workplace storage during relocations or refurbishments.",
        available: false,
    },
    {
        title: "Archive Storage",
        href: "/archive-storage-london",
        description:
            "Secure long-term storage for business records, legal files, financial documents, and confidential archives.",
        available: false,
    },
    {
        title: "Construction Equipment Storage",
        href: "/construction-equipment-storage-london",
        description:
            "Secure storage for tools, machinery, building materials, and contractor equipment with collection and delivery.",
        available: false,
    },
    {
        title: "Event Equipment Storage",
        href: "/event-equipment-storage-london",
        description:
            "Storage for exhibition stands, promotional materials, AV equipment, furniture, and event supplies.",
        available: false,
    },
    {
        title: "Healthcare Storage",
        href: "/healthcare-storage-london",
        description:
            "Managed storage for healthcare equipment, records, operational supplies, and non-clinical business inventory.",
        available: false,
    },
    {
        title: "School Storage",
        href: "/school-storage-london",
        description:
            "Flexible storage for classroom furniture, teaching resources, archives, sports equipment, and school supplies.",
        available: false,
    },
    {
        title: "Hospitality Storage",
        href: "/hospitality-storage-london",
        description:
            "Storage for hotel furniture, restaurant equipment, seasonal décor, catering supplies, and hospitality inventory.",
        available: false,
    },
    {
        title: "Seasonal Business Storage",
        href: "/seasonal-business-storage-london",
        description:
            "Flexible warehouse storage for seasonal stock, promotional inventory, holiday merchandise, and peak trading periods.",
        available: false,
    },
] as const;


function getSupportImage(service: ServiceSlug) {
    const images: Record<ServiceSlug, string> = {
        "warehouse-storage-london": "/images/location-service/warehouse-storage-location.webp",
        "business-storage-london": "/images/location-service/location-business-support.webp",
        "inventory-management-london": "/images/location-service/inventory-management-location.webp",
        "pallet-storage-london": "/images/location-service/pallet-storage-location.webp",
        "commercial-storage-london": "/images/location-service/commercial-storage-location.webp",
        "third-party-logistics-london": "/images/location-service/third-party-logistics-location.webp",
        "logistics-moving-london": "/images/location-service/moving-services-location.webp",
        "shredding-solutions-london": "/images/location-service/document-shredding-location.webp",
    };

    return images[service];
}

function getUseCases(service: ServiceSlug) {
    const useCases: Record<ServiceSlug, string[]> = {
        "warehouse-storage-london": [
            "Student storage and temporary accommodation storage",
            "Household items and furniture storage",
            "Business stock and ecommerce inventory",
            "Office equipment and archive storage",
            "Collection and return delivery services",
        ],
        "business-storage-london": [
            "Ecommerce inventory and retail stock storage",
            "Office furniture and equipment storage",
            "Archive storage and document handling",
            "Seasonal business stock overflow",
            "Business collection and return delivery services",
        ],
        "inventory-management-london": [
            "Ecommerce stock organisation",
            "Retail inventory handling",
            "Office assets and equipment tracking",
            "Warehouse item handling",
            "Collection and delivery coordination",
        ],
        "pallet-storage-london": [
            "Palletised goods storage",
            "Retail and wholesale stock",
            "Warehouse overflow support",
            "Commercial inventory storage",
            "Pallet collection and delivery coordination",
        ],
        "commercial-storage-london": [
            "Office equipment storage",
            "Commercial stock overflow",
            "Retail inventory storage",
            "Archive and document storage",
            "Business relocation storage support",
        ],
        "third-party-logistics-london": [
            "Ecommerce warehouse support",
            "Inventory coordination",
            "Pallet handling",
            "Fulfilment support",
            "Collection and delivery logistics",
        ],
        "logistics-moving-london": [
            "House moves and flat moves",
            "Student accommodation moves",
            "Office relocations",
            "Furniture transport",
            "Packing, loading and delivery support",
        ],
        "shredding-solutions-london": [
            "Confidential office paperwork",
            "Archive document destruction",
            "Legal and financial records",
            "HR files and business documents",
            "Secure collection and disposal",
        ],
    };

    return useCases[service];
}

function getFinalCta(service: ServiceSlug, locName: string) {
    const ctas: Record<ServiceSlug, { title: string; text: string; button: string }> = {
        "warehouse-storage-london": {
            title: `Need Storage Space in ${locName}?`,
            text: "Get secure warehouse storage with collection, flexible terms, and return delivery.",
            button: "Get Storage Quote",
        },
        "business-storage-london": {
            title: `Need Business Storage in ${locName}?`,
            text: "Store inventory, office equipment, archived documents, and commercial stock with collection and return delivery.",
            button: "Get Business Storage Quote",
        },
        "inventory-management-london": {
            title: `Need Inventory Management Storage in ${locName}?`,
            text: "Organise stock, business supplies, and stored inventory with warehouse handling and delivery support.",
            button: "Get Inventory Storage Quote",
        },
        "pallet-storage-london": {
            title: `Need Pallet Storage in ${locName}?`,
            text: "Store palletised goods securely with warehouse handling, collection, and delivery support.",
            button: "Get Pallet Storage Quote",
        },
        "commercial-storage-london": {
            title: `Need Commercial Storage in ${locName}?`,
            text: "Secure storage for office equipment, stock, archives, and commercial items.",
            button: "Get Commercial Storage Quote",
        },
        "third-party-logistics-london": {
            title: `Need 3PL Support in ${locName}?`,
            text: "Get warehouse support, inventory handling, pallet coordination, and delivery logistics.",
            button: "Get 3PL Quote",
        },
        "logistics-moving-london": {
            title: `Need Moving Services in ${locName}?`,
            text: "Get support for home moves, office relocations, student moves, packing, loading, and delivery.",
            button: "Get Moving Quote",
        },
        "shredding-solutions-london": {
            title: `Need Secure Document Shredding in ${locName}?`,
            text: "Arrange confidential document collection, shredding, and secure disposal support.",
            button: "Get Shredding Quote",
        },
    };

    return ctas[service];
}


type LocationItem = (typeof londonLocations)[number];
type PageParams = { service: string; location: string };
type PageProps = { params: Promise<PageParams> };
type RelatedService = { href: string; title: string; description: string };

type SectionProps = {
    service: ServiceSlug;
    location: LocationItem;
    content: (typeof serviceContent)[ServiceSlug];
};

const SITE_URL = "https://kxhlogistics.co.uk";
const focusRing =
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2";

function isServiceSlug(value: string): value is ServiceSlug {
    return value in serviceContent;
}

function quoteHref(service: ServiceSlug) {
    return `/get-a-quote?service=${serviceContent[service].quoteService}`;
}

function getMetadataCopy(service: ServiceSlug, location: LocationItem) {
    const locName = location.name;
    const titles: Record<ServiceSlug, string> = {
        "warehouse-storage-london": `Storage Space to Rent in ${locName}, London | Pickup & Delivery | KXH`,
        "logistics-moving-london": `Moving Services in ${locName}, London | Home & Office Moves | KXH`,
        "shredding-solutions-london": `Document Shredding in ${locName}, London | Secure Collection | KXH`,
        "business-storage-london": `Business Storage in ${locName}, London | Managed Storage | KXH`,
        "inventory-management-london": `Inventory Management & Storage in ${locName}, London | KXH`,
        "pallet-storage-london": `Pallet Storage in ${locName}, London | Collection & Delivery | KXH`,
        "commercial-storage-london": `Commercial Storage in ${locName}, London | Warehouse Support | KXH`,
        "third-party-logistics-london": `Third Party Logistics in ${locName}, London | 3PL Support | KXH`,
    };
    const descriptions: Record<ServiceSlug, string> = {
        "warehouse-storage-london": `Secure storage space in ${locName}, London with collection, managed warehouse storage, flexible terms, and return delivery for students, renters, households, and businesses.`,
        "logistics-moving-london": `Professional moving services in ${locName}, London for homes, offices, students, furniture, packing, loading, transport, and delivery.`,
        "shredding-solutions-london": `Secure document shredding in ${locName}, London with confidential collection, certified destruction, and compliant disposal support.`,
        "business-storage-london": `Secure business storage in ${locName}, London with collection, delivery, inventory support, and flexible managed warehouse storage.`,
        "inventory-management-london": `Managed inventory storage in ${locName}, London with item tracking, collection, warehouse handling, and delivery support for businesses.`,
        "pallet-storage-london": `Flexible pallet storage in ${locName}, London with warehouse handling, collection, secure storage, and delivery support for businesses.`,
        "commercial-storage-london": `Commercial warehouse storage in ${locName}, London for office equipment, stock, inventory, archives, and business storage needs.`,
        "third-party-logistics-london": `Third party logistics in ${locName}, London with warehouse support, inventory handling, pallet coordination, collection, and delivery.`,
    };
    return { title: titles[service], description: descriptions[service] };
}

export async function generateStaticParams(): Promise<PageParams[]> {
    const services = Object.keys(serviceContent) as ServiceSlug[];
    return services.flatMap((service) =>
        londonLocations.map((location) => ({ service, location: location.slug })),
    );
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { service, location } = await params;
    if (!isServiceSlug(service)) return {};
    const loc = londonLocations.find((item) => item.slug === location);
    if (!loc) return {};
    const { title, description } = getMetadataCopy(service, loc);
    const canonical = `${SITE_URL}/${service}/${location}`;
    return {
        title,
        description,
        alternates: { canonical },
    };
}

function StructuredData({ service, location, content }: SectionProps) {
    const canonical = `${SITE_URL}/${service}/${location.slug}`;
    const serviceSchema = {
        "@context": "https://schema.org",
        "@type": "Service",
        name: `${content.label} in ${location.name}, London`,
        serviceType: content.label,
        areaServed: { "@type": "AdministrativeArea", name: `${location.name}, London` },
        description: content.description,
        url: canonical,
        provider: {
            "@type": "LocalBusiness",
            name: "KXH Storage & Logistics",
            url: SITE_URL,
            telephone: "+44 1474 396663",
        },
    };
    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: content.faqs.map((faq) => ({
            "@type": "Question",
            name: faq.q,
            acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
    };
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
            <TrustpilotJsonLd />
        </>
    );
}

function Breadcrumbs({ service, location, content }: SectionProps) {
    const items = [
        { name: "Home", href: "/" },
        { name: "Services", href: "/services" },
        { name: content.label, href: `/${service}` },
        { name: location.name, href: `/${service}/${location.slug}` },
    ];
    const schema = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: items.map((item, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: item.name,
            item: `${SITE_URL}${item.href}`,
        })),
    };
    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
            <nav aria-label="Breadcrumb" className="mx-auto max-w-6xl px-4 pt-6 text-sm text-slate-500">
                <ol className="flex flex-wrap items-center gap-2">
                    {items.map((item, index) => (
                        <li key={item.href} className="flex items-center gap-2">
                            {index < items.length - 1 ? (
                                <Link href={item.href} className={`font-medium text-emerald-700 hover:underline ${focusRing}`}>
                                    {item.name}
                                </Link>
                            ) : (
                                <span aria-current="page" className="font-semibold text-slate-700">{item.name}</span>
                            )}
                            {index < items.length - 1 && <span aria-hidden="true" className="text-slate-300">/</span>}
                        </li>
                    ))}
                </ol>
            </nav>
        </>
    );
}

function LocationHero({ service, location, content }: SectionProps) {
    return (
        <section className="bg-gradient-to-b from-slate-50 to-white py-16 lg:py-20" aria-labelledby="page-title">
            <div className="mx-auto max-w-6xl px-4">
                <div className="mx-auto max-w-4xl text-center">
                    <p className="inline-flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-4 py-1.5 text-sm font-semibold text-emerald-800">
                        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-emerald-600" />
                        {content.label} in {location.name}
                    </p>
                    <h1 id="page-title" className="mt-6 text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                        {content.h1(location.name)}
                    </h1>
                    <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-600">{content.intro(location.name)}</p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
                        <Link href={quoteHref(service)} className={`rounded-xl bg-emerald-700 px-6 py-3 font-semibold text-white shadow-lg transition hover:bg-emerald-800 ${focusRing}`}>
                            Request a Quote
                        </Link>
                        <Link href="#how-it-works" className={`rounded-xl border border-slate-300 bg-white px-6 py-3 font-semibold text-slate-800 transition hover:bg-slate-50 ${focusRing}`}>
                            See How It Works
                        </Link>
                    </div>
                    <div className="mt-6 flex justify-center"><TrustpilotPill /></div>
                </div>
                <Image
                    src={serviceImages[service]}
                    alt={`${content.label} service available in ${location.name}, London`}
                    width={1200}
                    height={700}
                    priority
                    sizes="(min-width: 1024px) 1152px, 100vw"
                    className="mt-10 aspect-[12/7] w-full rounded-3xl object-cover shadow-xl"
                />
            </div>
        </section>
    );
}

function BenefitsStrip({ service, content }: SectionProps) {
    const benefits = service === "business-storage-london"
        ? ["Collection from your business", "Secure managed storage", "Flexible storage terms", "Return delivery when needed"]
        : content.benefits.slice(0, 4);
    return (
        <section aria-label={`${content.label} benefits`} className="border-y border-emerald-100 bg-emerald-50">
            <div className="mx-auto max-w-6xl px-4 py-6">
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    {benefits.map((benefit) => (
                        <li key={benefit} className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white px-4 py-3 text-sm font-semibold text-emerald-800">
                            <span aria-hidden="true" className="font-black">✓</span>{benefit}
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
}

function ServiceOverview({ service, location, content }: SectionProps) {
    const business = service === "business-storage-london";
    const title = business ? `Managed Business Storage in ${location.name}` : `Local ${content.label} in ${location.name}`;
    return (
        <section className="border-b border-slate-200 bg-white py-16 lg:py-20" aria-labelledby="overview-title">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid items-start gap-10 lg:grid-cols-2 lg:gap-12">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Managed local service</p>
                        <h2 id="overview-title" className="mt-3 text-3xl font-black sm:text-4xl">{title}</h2>
                        {business ? (
                            <>
                                <p className="mt-5 leading-7 text-slate-600">KXH Storage & Logistics provides flexible business storage across {location.name} for stock, equipment, office furniture, documents, seasonal inventory, and commercial assets.</p>
                                <p className="mt-4 leading-7 text-slate-600">We collect items from your premises, place them into managed warehouse storage, and arrange return delivery when required. This helps businesses gain space without leasing a larger property or coordinating warehouse transport separately.</p>
                                <p className="mt-4 leading-7 text-slate-600">The service supports ecommerce sellers, retailers, offices, schools, hospitality businesses, contractors, event companies, and other organisations with changing storage requirements.</p>
                            </>
                        ) : (
                            <>
                                <p className="mt-5 leading-7 text-slate-600">KXH Logistics supports customers across {location.name} with {content.label.toLowerCase()}, collection, handling, transport, storage, and delivery tailored to the service selected.</p>
                                <p className="mt-4 leading-7 text-slate-600">Our managed approach reduces the need to arrange separate vehicles, warehouse access, contractors, or return transport.</p>
                            </>
                        )}
                    </div>
                    <div>
                        <Image src={getSupportImage(service)} alt={`KXH ${content.label.toLowerCase()} operations serving ${location.name}`} width={900} height={700} loading="lazy" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] w-full rounded-2xl object-cover shadow-lg" />
                        <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-6">
                            <h3 className="text-xl font-bold">Common uses in {location.name}</h3>
                            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
                                {getUseCases(service).map((item) => <li key={item} className="flex gap-3 text-sm leading-6 text-slate-700"><span aria-hidden="true" className="font-bold text-emerald-700">✓</span><span>{item}</span></li>)}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

function WarehouseAudienceSection({ location }: { location: LocationItem }) {
    const groups = [
        { title: "Student Storage", text: `Storage during summer breaks, accommodation changes, internships, and temporary moves in ${location.name}.`, href: "/student-storage-london" },
        { title: "Renter & Household Storage", text: `Short- or long-term storage during flat moves, renovations, delayed move-in dates, and downsizing.`, href: `/logistics-moving-london/${location.slug}` },
        { title: "Business Storage", text: `Storage for ecommerce stock, office equipment, documents, retail inventory, and commercial items.`, href: `/business-storage-london/${location.slug}` },
    ];
    return (
        <section className="bg-slate-50 py-16 lg:py-20" aria-labelledby="audience-title">
            <div className="mx-auto max-w-6xl px-4">
                <div className="mx-auto max-w-3xl text-center">
                    <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Storage for local customers</p>
                    <h2 id="audience-title" className="mt-3 text-3xl font-black sm:text-4xl">Storage for Students, Renters and Businesses in {location.name}</h2>
                    <p className="mt-4 leading-7 text-slate-600">Collection and return delivery make storage practical whether you are changing accommodation, moving home, or creating more operational space.</p>
                </div>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {groups.map((group) => <article key={group.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><h3 className="text-xl font-bold">{group.title}</h3><p className="mt-3 leading-7 text-slate-600">{group.text}</p><Link href={group.href} className={`mt-5 inline-flex font-semibold text-emerald-700 hover:underline ${focusRing}`}>Explore {group.title}<span aria-hidden="true" className="ml-1">→</span></Link></article>)}
                </div>
            </div>
        </section>
    );
}

function LocalContextSection({ service, location, content }: SectionProps) {
    const local = boroughContent[location.slug]?.[service];
    return (
        <section className="border-y border-slate-200 bg-white py-16 lg:py-20" aria-labelledby="local-context-title">
            <div className="mx-auto max-w-6xl px-4">
                <div className="grid gap-10 lg:grid-cols-[1.2fr_.8fr] lg:items-start">
                    <div className="max-w-3xl">
                        <p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Local service context</p>
                        <h2 id="local-context-title" className="mt-3 text-3xl font-black sm:text-4xl">{content.label} Support in {location.name}</h2>
                        <p className="mt-5 leading-7 text-slate-600">{local?.localIntro ?? `KXH Logistics helps customers in ${location.name} arrange reliable, fully managed ${content.label.toLowerCase()} without handling transport and logistics alone.`}</p>
                        <p className="mt-4 leading-7 text-slate-600">{local?.localUseCase ?? `Our service supports households, students, offices, and businesses through a straightforward quote, collection, handling, and delivery process.`}</p>
                    </div>
                    <aside className="rounded-2xl border border-slate-200 bg-slate-50 p-6" aria-label={`${content.label} is ideal for`}>
                        <h3 className="text-xl font-bold">Ideal for</h3>
                        <ul className="mt-5 space-y-3">{content.idealFor.map((item) => <li key={item} className="flex gap-3 text-slate-700"><span aria-hidden="true" className="font-bold text-emerald-700">✓</span>{item}</li>)}</ul>
                    </aside>
                </div>
            </div>
        </section>
    );
}

function HowItWorksSection({ location, content }: SectionProps) {
    return (
        <section id="how-it-works" className="scroll-mt-24 bg-slate-50 py-16 lg:py-20" aria-labelledby="how-title">
            <div className="mx-auto max-w-6xl px-4">
                <div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Simple managed process</p><h2 id="how-title" className="mt-3 text-3xl font-black sm:text-4xl">How It Works in {location.name}</h2><p className="mt-4 leading-7 text-slate-600">A clear process from quote and collection through secure handling and delivery.</p></div>
                <ol className="mt-10 grid gap-6 md:grid-cols-3">{content.process.map((step, index) => <li key={step} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"><span className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-100 text-lg font-black text-emerald-800">{index + 1}</span><p className="mt-4 leading-7 text-slate-700">{step}</p></li>)}</ol>
            </div>
        </section>
    );
}

function WhyChooseSection({ service, location, content }: SectionProps) {
    const items = service === "business-storage-london"
        ? ["Collection from your premises", "Managed warehouse handling", "Storage that can scale with demand", "Return delivery when required"]
        : service === "warehouse-storage-london"
            ? ["No need to rent a van", "Short- and long-term options", "Storage for homes and businesses", "Return delivery across London"]
            : ["Experienced operational support", "Flexible booking and scheduling", "Clear quote-based service", "Collection and delivery coordination"];
    return (
        <section className="bg-white py-16 lg:py-20" aria-labelledby="why-title"><div className="mx-auto max-w-6xl px-4"><div className="grid gap-10 lg:grid-cols-2 lg:items-center"><div><p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Why KXH</p><h2 id="why-title" className="mt-3 text-3xl font-black sm:text-4xl">Why {service === "business-storage-london" ? "Businesses" : "Customers"} Choose KXH in {location.name}</h2><p className="mt-5 leading-7 text-slate-600">KXH combines local collection, professional handling, and practical logistics support so customers can use one managed service rather than coordinating several providers.</p></div><div className="grid gap-4 sm:grid-cols-2">{items.map((item) => <div key={item} className="rounded-2xl border border-slate-200 bg-slate-50 p-5"><span aria-hidden="true" className="text-xl font-black text-emerald-700">✓</span><h3 className="mt-3 font-bold">{item}</h3><p className="mt-2 text-sm leading-6 text-slate-600">Available as part of our {content.label.toLowerCase()} service in {location.name} and across London.</p></div>)}</div></div></div></section>
    );
}

function BusinessIndustrySection({ location }: { location: LocationItem }) {
    const availableIndustries = businessStorageIndustries.filter((industry) => industry.available);
    return (
        <section className="border-y border-slate-200 bg-slate-50 py-16 lg:py-20" aria-labelledby="industry-title"><div className="mx-auto max-w-6xl px-4"><div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Business storage options</p><h2 id="industry-title" className="mt-3 text-3xl font-black sm:text-4xl">Available Business Storage Solutions</h2><p className="mt-4 leading-7 text-slate-600">Explore dedicated storage solutions for businesses in {location.name}. Future industry services remain planned, but only currently available pages are shown here.</p></div><div className="mt-10 grid gap-6 md:grid-cols-2">{availableIndustries.map((industry) => <Link key={industry.href} href={industry.href} className={`group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md ${focusRing}`}><h3 className="text-xl font-bold group-hover:text-emerald-700">{industry.title}</h3><p className="mt-3 leading-7 text-slate-600">{industry.description}</p><span className="mt-5 inline-flex font-semibold text-emerald-700">View solution <span aria-hidden="true" className="ml-1 transition group-hover:translate-x-1">→</span></span></Link>)}</div><div className="mt-8"><Link href="/business-storage-london" className={`inline-flex rounded-xl bg-emerald-700 px-5 py-3 font-semibold text-white hover:bg-emerald-800 ${focusRing}`}>Explore All Business Storage</Link></div></div></section>
    );
}

function TeamSection({ location, content }: Omit<SectionProps, "service">) {
    return (
        <section className="bg-white py-16 lg:py-20" aria-labelledby="team-title"><div className="mx-auto max-w-6xl px-4"><div className="grid gap-10 lg:grid-cols-2 lg:items-center"><Image src="/images/location-service/location-team-photo.webp" alt={`KXH Storage & Logistics operations team serving ${location.name}`} width={1400} height={800} loading="lazy" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[7/4] w-full rounded-3xl object-cover shadow-xl" /><div><p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Operational trust</p><h2 id="team-title" className="mt-3 text-3xl font-black sm:text-4xl">A Team That Manages the Details</h2><p className="mt-5 leading-7 text-slate-600">From collection planning to careful handling and delivery coordination, the KXH team supports each stage of your {content.label.toLowerCase()} service in {location.name}.</p><ul className="mt-6 space-y-3 text-slate-700"><li className="flex gap-3"><span aria-hidden="true" className="font-bold text-emerald-700">✓</span>Professional collection and handling</li><li className="flex gap-3"><span aria-hidden="true" className="font-bold text-emerald-700">✓</span>Clear communication throughout the service</li><li className="flex gap-3"><span aria-hidden="true" className="font-bold text-emerald-700">✓</span>Flexible support for changing requirements</li></ul></div></div></div></section>
    );
}

function getRelatedServices(service: ServiceSlug, location: LocationItem): { primary: RelatedService[]; secondary: RelatedService[] } {
    const all: Record<ServiceSlug, RelatedService[]> = {
        "business-storage-london": [
            { href: `/warehouse-storage-london/${location.slug}`, title: "Warehouse Storage", description: "Managed storage with collection and return delivery." },
            { href: `/inventory-management-london/${location.slug}`, title: "Inventory Management", description: "Organised stock handling and inventory support." },
            { href: `/pallet-storage-london/${location.slug}`, title: "Pallet Storage", description: "Secure handling and storage for palletised goods." },
            { href: `/third-party-logistics-london/${location.slug}`, title: "Third Party Logistics", description: "Flexible 3PL warehouse and logistics coordination." },
            { href: `/commercial-storage-london/${location.slug}`, title: "Commercial Storage", description: "Storage for equipment, archives, and commercial stock." },
            { href: `/logistics-moving-london/${location.slug}`, title: "Moving Services", description: "Managed home, office, and business moves." },
            { href: `/shredding-solutions-london/${location.slug}`, title: "Document Shredding", description: "Confidential document collection and destruction." },
        ],
        "warehouse-storage-london": [
            { href: `/business-storage-london/${location.slug}`, title: "Business Storage", description: "Flexible storage for stock, equipment, and office items." },
            { href: "/student-storage-london", title: "Student Storage", description: "Collection, storage, and return delivery for students." },
            { href: `/logistics-moving-london/${location.slug}`, title: "Moving Services", description: "Home, office, furniture, and student moves." },
            { href: `/inventory-management-london/${location.slug}`, title: "Inventory Management", description: "Organised warehouse storage with stock support." },
            { href: `/pallet-storage-london/${location.slug}`, title: "Pallet Storage", description: "Storage for larger commercial stock volumes." },
            { href: `/third-party-logistics-london/${location.slug}`, title: "Third Party Logistics", description: "Warehouse and delivery coordination." },
        ],
        "inventory-management-london": [
            { href: `/business-storage-london/${location.slug}`, title: "Business Storage", description: "Flexible storage for business stock and assets." },
            { href: `/warehouse-storage-london/${location.slug}`, title: "Warehouse Storage", description: "Managed storage with collection and delivery." },
            { href: `/pallet-storage-london/${location.slug}`, title: "Pallet Storage", description: "Pallet handling and secure storage." },
            { href: `/third-party-logistics-london/${location.slug}`, title: "Third Party Logistics", description: "Outsourced warehouse and logistics support." },
            { href: `/commercial-storage-london/${location.slug}`, title: "Commercial Storage", description: "Storage for equipment and commercial stock." },
        ],
        "pallet-storage-london": [
            { href: `/business-storage-london/${location.slug}`, title: "Business Storage", description: "Flexible storage for stock and equipment." },
            { href: `/inventory-management-london/${location.slug}`, title: "Inventory Management", description: "Organised stock and item handling." },
            { href: `/warehouse-storage-london/${location.slug}`, title: "Warehouse Storage", description: "Managed warehouse space with collection." },
            { href: `/third-party-logistics-london/${location.slug}`, title: "Third Party Logistics", description: "3PL support for stock and deliveries." },
            { href: `/commercial-storage-london/${location.slug}`, title: "Commercial Storage", description: "Flexible commercial warehouse support." },
        ],
        "commercial-storage-london": [
            { href: `/business-storage-london/${location.slug}`, title: "Business Storage", description: "Storage for stock, equipment, and archives." },
            { href: `/warehouse-storage-london/${location.slug}`, title: "Warehouse Storage", description: "Managed storage with collection and delivery." },
            { href: `/inventory-management-london/${location.slug}`, title: "Inventory Management", description: "Organised stock handling and tracking support." },
            { href: `/pallet-storage-london/${location.slug}`, title: "Pallet Storage", description: "Secure storage for palletised stock." },
            { href: `/third-party-logistics-london/${location.slug}`, title: "Third Party Logistics", description: "Warehouse and logistics coordination." },
        ],
        "third-party-logistics-london": [
            { href: `/inventory-management-london/${location.slug}`, title: "Inventory Management", description: "Organised stock handling and storage." },
            { href: `/pallet-storage-london/${location.slug}`, title: "Pallet Storage", description: "Pallet coordination and secure storage." },
            { href: `/warehouse-storage-london/${location.slug}`, title: "Warehouse Storage", description: "Flexible warehouse space with collection." },
            { href: `/business-storage-london/${location.slug}`, title: "Business Storage", description: "Storage for inventory, equipment, and assets." },
            { href: `/commercial-storage-london/${location.slug}`, title: "Commercial Storage", description: "Commercial space and warehouse support." },
        ],
        "logistics-moving-london": [
            { href: `/warehouse-storage-london/${location.slug}`, title: "Warehouse Storage", description: "Store items before, during, or after a move." },
            { href: "/student-storage-london", title: "Student Storage", description: "Storage and moving support for university students." },
            { href: `/business-storage-london/${location.slug}`, title: "Business Storage", description: "Storage during office moves and relocations." },
            { href: `/commercial-storage-london/${location.slug}`, title: "Commercial Storage", description: "Storage for office equipment and assets." },
            { href: `/shredding-solutions-london/${location.slug}`, title: "Document Shredding", description: "Secure disposal during office clear-outs." },
        ],
        "shredding-solutions-london": [
            { href: `/business-storage-london/${location.slug}`, title: "Business Storage", description: "Store business assets and archived materials." },
            { href: `/commercial-storage-london/${location.slug}`, title: "Commercial Storage", description: "Storage for office equipment and records." },
            { href: `/warehouse-storage-london/${location.slug}`, title: "Warehouse Storage", description: "Managed storage with collection and delivery." },
            { href: `/logistics-moving-london/${location.slug}`, title: "Moving Services", description: "Office moves, clear-outs, and transport support." },
            { href: `/inventory-management-london/${location.slug}`, title: "Inventory Management", description: "Organised handling for stored business items." },
        ],
    };
    return { primary: all[service].slice(0, 4), secondary: all[service].slice(4) };
}

function RelatedServicesSection({ service, location, content }: SectionProps) {
    const { primary, secondary } = getRelatedServices(service, location);
    return (
        <section className="border-y border-slate-200 bg-slate-50 py-16 lg:py-20" aria-labelledby="related-title"><div className="mx-auto max-w-6xl px-4"><div className="mx-auto max-w-3xl text-center"><p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Related services</p><h2 id="related-title" className="mt-3 text-3xl font-black sm:text-4xl">Explore Related Services in {location.name}</h2><p className="mt-4 leading-7 text-slate-600">Combine {content.label.toLowerCase()} with other KXH storage, moving, and logistics services.</p></div><div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">{primary.map((item) => <Link key={item.href} href={item.href} className={`group rounded-2xl border border-slate-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md ${focusRing}`}><h3 className="text-lg font-bold group-hover:text-emerald-700">{item.title}</h3><p className="mt-3 text-sm leading-6 text-slate-600">{item.description}</p><span className="mt-5 inline-flex font-semibold text-emerald-700">View service <span aria-hidden="true" className="ml-1">→</span></span></Link>)}</div>{secondary.length > 0 && <div className="mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3 text-sm">{secondary.map((item) => <Link key={item.href} href={item.href} className={`font-semibold text-emerald-700 hover:underline ${focusRing}`}>{item.title} in {location.name}</Link>)}</div>}</div></section>
    );
}

function FAQSection({ location, content }: Omit<SectionProps, "service">) {
    return (
        <section className="bg-white py-16 lg:py-20" aria-labelledby="faq-title"><div className="mx-auto max-w-6xl px-4"><div className="mx-auto max-w-4xl"><div className="text-center"><p className="text-sm font-bold uppercase tracking-wider text-emerald-700">Questions answered</p><h2 id="faq-title" className="mt-3 text-3xl font-black sm:text-4xl">Frequently Asked Questions</h2><p className="mt-4 text-slate-600">Common questions about {content.label.toLowerCase()} in {location.name}.</p></div><div className="mt-10 space-y-3">{content.faqs.map((faq) => <details key={faq.q} className="group rounded-xl border border-slate-200 bg-white p-5"><summary className={`cursor-pointer list-none font-semibold text-slate-900 ${focusRing}`}>{faq.q}<span aria-hidden="true" className="float-right text-emerald-700 transition group-open:rotate-45">+</span></summary><p className="mt-3 max-w-3xl leading-7 text-slate-600">{faq.a}</p></details>)}</div></div></div></section>
    );
}

function getAreaSupportText(service: ServiceSlug, label: string) {
    const text: Record<ServiceSlug, string> = {
        "warehouse-storage-london": "Explore managed storage with collection and return delivery across London boroughs.",
        "business-storage-london": "Find managed business storage for stock, equipment, documents, and office assets across London.",
        "inventory-management-london": "Explore inventory-managed storage, item handling, collection, and delivery across London.",
        "pallet-storage-london": "Find pallet storage with warehouse handling and delivery coordination across London.",
        "commercial-storage-london": "Explore flexible commercial storage for equipment, stock, archives, and business assets.",
        "third-party-logistics-london": "Find flexible 3PL warehouse, inventory, pallet, collection, and delivery support across London.",
        "logistics-moving-london": "Explore home, office, student, and furniture moving support across London boroughs.",
        "shredding-solutions-london": "Find secure document collection and confidential shredding services across London.",
    };
    return text[service] ?? `Explore ${label.toLowerCase()} across London.`;
}

function LondonServiceAreasSection({ service, location, content }: SectionProps) {
    const otherAreas = londonLocations.filter((area) => area.slug !== location.slug);
    return (
        <section className="border-t border-slate-200 bg-white py-16 lg:py-20" aria-labelledby="areas-title"><div className="mx-auto max-w-6xl px-4"><div className="max-w-3xl"><p className="text-sm font-bold uppercase tracking-wider text-emerald-700">London Service Areas</p><h2 id="areas-title" className="mt-3 text-3xl font-black sm:text-4xl">{content.label} Across London</h2><p className="mt-4 leading-7 text-slate-600">{getAreaSupportText(service, content.label)}</p></div><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{otherAreas.map((area) => <Link key={area.slug} href={`/${service}/${area.slug}`} className={`group flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-5 py-4 transition hover:-translate-y-0.5 hover:border-emerald-300 hover:bg-emerald-50 hover:shadow-sm ${focusRing}`}><span><span className="block text-xs font-semibold uppercase tracking-wide text-slate-500">{content.label}</span><span className="mt-1 block font-bold text-slate-900 group-hover:text-emerald-700">{area.name}</span></span><span aria-hidden="true" className="ml-4 text-lg font-bold text-emerald-700 transition group-hover:translate-x-1">→</span></Link>)}</div><div className="mt-10 rounded-2xl border border-emerald-200 bg-emerald-50 px-6 py-5 sm:flex sm:items-center sm:justify-between sm:gap-6"><div><h3 className="font-bold">Need service in another London area?</h3><p className="mt-1 text-sm leading-6 text-slate-600">Contact KXH to confirm collection, delivery, and service availability for your postcode.</p></div><Link href={quoteHref(service)} className={`mt-4 inline-flex shrink-0 rounded-xl bg-emerald-700 px-5 py-3 text-sm font-semibold text-white hover:bg-emerald-800 sm:mt-0 ${focusRing}`}>Check Availability</Link></div></div></section>
    );
}

function FinalCtaSection({ service, location }: Pick<SectionProps, "service" | "location">) {
    const cta = getFinalCta(service, location.name);
    return (
        <section className="bg-slate-950 py-16 text-center text-white lg:py-20" aria-labelledby="final-cta-title"><div className="mx-auto max-w-6xl px-4"><div className="mx-auto max-w-3xl"><h2 id="final-cta-title" className="text-3xl font-black sm:text-4xl">{cta.title}</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-slate-300">{cta.text}</p><Link href={quoteHref(service)} className={`mt-8 inline-flex rounded-xl bg-emerald-600 px-8 py-4 font-semibold text-white transition hover:bg-emerald-500 ${focusRing}`}>{cta.button}</Link></div></div></section>
    );
}

export default async function LocationServicePage({ params }: PageProps) {
    const { service: serviceParam, location: locationParam } = await params;
    if (!isServiceSlug(serviceParam)) notFound();
    const location = londonLocations.find((item) => item.slug === locationParam);
    if (!location) notFound();
    const service = serviceParam as ServiceSlug;
    const content = serviceContent[service];

    return (
        <>
            <CrispChat />
            <Nav />
            <Breadcrumbs service={service} location={location} content={content} />
            <main className="min-h-screen bg-white text-slate-900">
                <StructuredData service={service} location={location} content={content} />
                <LocationHero service={service} location={location} content={content} />
                <BenefitsStrip service={service} location={location} content={content} />
                <ServiceOverview service={service} location={location} content={content} />
                {service === "warehouse-storage-london" && <WarehouseAudienceSection location={location} />}
                <LocalContextSection service={service} location={location} content={content} />
                <HowItWorksSection service={service} location={location} content={content} />
                <WhyChooseSection service={service} location={location} content={content} />
                {service === "business-storage-london" && <BusinessIndustrySection location={location} />}
                <TeamSection location={location} content={content} />
                <TestimonialsSection />
                <RelatedServicesSection service={service} location={location} content={content} />
                <FAQSection location={location} content={content} />
                <LondonServiceAreasSection service={service} location={location} content={content} />
                <FinalCtaSection service={service} location={location} />
                <MainFooter locations={londonLocations} />
            </main>
        </>
    );
}