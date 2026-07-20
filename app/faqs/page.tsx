import type { Metadata } from "next";
import MainFooter from "../components/footer/MainFooter";
import { londonLocations } from "../sitemap";
import CrispChat from "../components/chat/CrispChat";
import FAQsClient from "./FAQsClient";
import Nav from "../components/MobileNav";

export const metadata: Metadata = {
    title: "Storage, Moving & Logistics FAQs | KXH Storage & Logistics London",
    description:
        "Find answers about storage, moving, business storage, warehouse storage, student storage, logistics, collection, delivery, pricing, security and bookings across London.",
    alternates: {
        canonical: "https://kxhlogistics.co.uk/faqs",
    },
};

type FAQ = {
    question: string;
    answer: string;
    link?: {
        href: string;
        label: string;
    };
};

type FAQSection = {
    id: string;
    title: string;
    icon: string;
    description: string;
    faqs: FAQ[];
};

const serviceShortcuts = [
    {
        title: "Moving Services",
        href: "/logistics-moving-london",
        description: "House, apartment, office and commercial moves.",
    },
    {
        title: "Warehouse Storage",
        href: "/warehouse-storage-london",
        description: "Managed storage with collection and return delivery.",
    },
    {
        title: "Business Storage",
        href: "/business-storage-london",
        description: "Flexible storage for stock, equipment and office assets.",
    },
    {
        title: "Student Storage",
        href: "/student-storage-london",
        description: "Collection, storage and redelivery for students.",
    },
    {
        title: "Inventory Management",
        href: "/inventory-management-london",
        description: "Organised physical storage for business inventory.",
    },
    {
        title: "Pallet Storage",
        href: "/pallet-storage-london",
        description: "Flexible pallet capacity for commercial stock.",
    },
];

const sections: FAQSection[] = [
    {
        id: "general",
        title: "General",
        icon: "ℹ️",
        description: "General information about KXH Storage & Logistics, the customers we support, the services available and the steps involved in requesting a tailored moving, storage or logistics quotation.",
        faqs: [
            {
                question: "Who is KXH Storage & Logistics?",
                answer:
                    "KXH Storage & Logistics provides managed moving, storage and logistics support for households, students and businesses across London.",
            },
            {
                question: "What services does KXH offer?",
                answer:
                    "Services include moving, warehouse storage, business storage, student storage, inventory management, pallet storage, collection and delivery, furniture transport and document shredding.",
            },
            {
                question: "Can both individuals and businesses use KXH?",
                answer:
                    "Yes. KXH supports homeowners, renters, students, landlords, offices, ecommerce businesses, retailers and other organisations.",
            },
            {
                question: "How do I request a quote?",
                answer:
                    "Complete the online quote form with the service, locations, dates, access details and items involved. The team will review the request and prepare a tailored quotation.",
                link: {
                    href: "/get-a-quote",
                    label: "Request a tailored quote",
                },
            },
            {
                question: "Can I speak to someone before booking?",
                answer:
                    "Yes. You can contact the team to discuss your requirements before requesting or confirming a quotation.",
                link: {
                    href: "/contact",
                    label: "Contact the KXH team",
                },
            },
            {
                question: "Do you provide fixed packages?",
                answer:
                    "Some services may follow standard processes, but quotations are generally based on the actual work, volume, access, labour, transport and storage requirements.",
            },
            {
                question: "Can I combine more than one service?",
                answer:
                    "Yes. Moving, packing, collection, storage, inventory handling and redelivery can be coordinated as one service where suitable.",
            },
            {
                question: "How quickly will KXH respond?",
                answer:
                    "Response times depend on enquiry volume and the information provided. Complete details help the team review your request more efficiently.",
            },
            {
                question: "Do I need to visit the warehouse?",
                answer:
                    "Not necessarily. Managed storage is designed around collection and return delivery, so many customers do not need to transport items themselves.",
            },
            {
                question: "Where can I find service-specific information?",
                answer:
                    "Each main service has a dedicated page explaining how it works, suitable customers, common scenarios and related services.",
                link: {
                    href: "/services",
                    label: "Explore all KXH services",
                },
            },

{
    question: "Does KXH provide advice before I choose a service?",
    answer:
        "Yes. The team can review your items, locations, timing and access requirements and explain which moving, storage or logistics option is most suitable.",
},

{
    question: "Can I send photos or an inventory list with my enquiry?",
    answer:
        "Yes. Photos, item lists and measurements can help the team understand volume, access and handling requirements before preparing a quotation.",
},
        ],
    },
    {
        id: "moving",
        title: "Moving Services",
        icon: "🚚",
        description: "Guidance for house removals, apartment moves, office relocations, commercial moves and individual furniture transport, including packing, access, scheduling, temporary storage and delivery.",
        faqs: [
            {
                question: "How much do moving services cost?",
                answer:
                    "Moving costs depend on property size, volume, distance, access, labour, packing, furniture handling, parking and any optional storage or dismantling.",
                link: {
                    href: "/logistics-moving-london",
                    label: "Learn about moving services in London",
                },
            },
            {
                question: "How long does a London move usually take?",
                answer:
                    "The duration depends on the size of the move, access, packing, parking, travel distance and whether dismantling or storage is included.",
            },
            {
                question: "Can KXH pack my belongings?",
                answer:
                    "Yes. Professional packing and suitable materials can be included for selected items or the complete move.",
            },
            {
                question: "Do you provide boxes and packing materials?",
                answer:
                    "Packing materials can be included as part of the agreed moving plan. Tell the team what you are moving so suitable quantities can be reviewed.",
            },
            {
                question: "Can you dismantle and reassemble furniture?",
                answer:
                    "Dismantling and reassembly may be included where agreed in advance and suitable for the furniture involved.",
            },
            {
                question: "Can you move apartments and flats?",
                answer:
                    "Yes. Apartment moves can be planned around lifts, stairs, concierge rules, loading bays, parking restrictions and building access.",
            },
            {
                question: "Do you provide office removals?",
                answer:
                    "Yes. Office moves can include planning, packing, furniture and equipment handling, temporary storage and staged delivery.",
            },
            {
                question: "Can you move a single item of furniture?",
                answer:
                    "Individual furniture transport may be available depending on the item, locations, access and scheduling.",
            },
            {
                question: "Can moving and storage be combined?",
                answer:
                    "Yes. KXH can collect belongings, place them into managed storage and arrange redelivery when the destination is ready.",
                link: {
                    href: "/warehouse-storage-london",
                    label: "Explore storage during a move",
                },
            },
            {
                question: "Are weekend or short-notice moves available?",
                answer:
                    "Weekend and short-notice support may be available depending on team capacity, vehicle availability, locations and the work required.",
            },

{
    question: "Can you move fragile or high-care furniture?",
    answer:
        "Fragile, awkward or high-care furniture may be moved when identified in advance so appropriate packing, labour and handling requirements can be reviewed.",
},

{
    question: "What should I do if my moving date changes?",
    answer:
        "Contact KXH as soon as possible. Revised scheduling or temporary storage may be available depending on notice and capacity.",
},
        ],
    },
    {
        id: "storage",
        title: "Storage",
        icon: "📦",
        description: "How managed storage works from initial collection through secure storage and final redelivery, including storage periods, access arrangements, additional items and preparation requirements.",
        faqs: [
            {
                question: "How does managed storage work?",
                answer:
                    "KXH collects your belongings, stores them in a managed facility and arranges return delivery when requested.",
                link: {
                    href: "/warehouse-storage-london",
                    label: "Learn how managed storage works",
                },
            },
            {
                question: "How long can I store my belongings?",
                answer:
                    "Storage periods can be short or longer term depending on availability and the agreed booking.",
            },
            {
                question: "Can I extend my storage period?",
                answer:
                    "Extensions may be available. Contact the team before the end of the agreed period so availability and pricing can be reviewed.",
            },
            {
                question: "Can I request my belongings back early?",
                answer:
                    "Return delivery may be arranged earlier, subject to notice, scheduling and any applicable terms.",
            },
            {
                question: "Can I access items while they are in storage?",
                answer:
                    "Access arrangements depend on the service and facility. Contact the team in advance rather than arriving without an appointment.",
            },
            {
                question: "Do I need to transport items to the warehouse myself?",
                answer:
                    "No. Collection can be included, which is one of the main differences between managed storage and traditional self storage.",
            },
            {
                question: "Can KXH return items to a different address?",
                answer:
                    "A different return address may be possible if the new location, access and delivery requirements are confirmed in advance.",
            },
            {
                question: "Can I add more items later?",
                answer:
                    "Additional collections or storage capacity may be arranged subject to availability and a revised quotation.",
            },
            {
                question: "What items cannot be stored?",
                answer:
                    "Hazardous, illegal, perishable, explosive or otherwise prohibited items cannot be accepted. Ask the team if you are unsure about a specific item.",
            },
            {
                question: "How should belongings be prepared for storage?",
                answer:
                    "Items should be clean, dry and packed appropriately. Fragile belongings, furniture and appliances may require additional protection.",
            },

{
    question: "Can storage support a home renovation?",
    answer:
        "Yes. Furniture, boxes and approved household items can be collected and stored while renovation or decorating work is completed.",
},

{
    question: "Can only part of my belongings be returned?",
    answer:
        "Partial or staged redelivery may be possible where items are clearly identified and the required handling can be arranged.",
},
        ],
    },
    {
        id: "business-storage",
        title: "Business Storage",
        icon: "🏢",
        description: "Business storage for office furniture, equipment, archives, retail stock, ecommerce inventory and operational assets, with flexible collection, organisation and staged return delivery.",
        faqs: [
            {
                question: "What can businesses store with KXH?",
                answer:
                    "Businesses may store office furniture, equipment, retail stock, ecommerce inventory, displays, archives and other approved operational assets.",
                link: {
                    href: "/business-storage-london",
                    label: "Explore business storage",
                },
            },
            {
                question: "Can you collect stock from our premises?",
                answer:
                    "Yes. Collection can be arranged from offices, retail units, commercial premises or other approved locations.",
            },
            {
                question: "Can you store office furniture during a refurbishment?",
                answer:
                    "Yes. Desks, chairs, cabinets and other office furniture can be stored while premises are renovated or reorganised.",
            },
            {
                question: "Can business storage be short term?",
                answer:
                    "Yes. Short-term storage can support relocations, refurbishments, seasonal demand and temporary space constraints.",
            },
            {
                question: "Can business storage be ongoing?",
                answer:
                    "Longer-term storage may be arranged for businesses that need recurring or flexible capacity.",
            },
            {
                question: "Can multiple departments use the same storage service?",
                answer:
                    "Items can be organised by team, department, project, category or another agreed method.",
            },
            {
                question: "Can KXH support office relocations?",
                answer:
                    "Yes. Moving, storage and staged delivery can be coordinated to reduce disruption during an office relocation.",
                link: {
                    href: "/logistics-moving-london",
                    label: "View office moving support",
                },
            },
            {
                question: "Can archived documents be stored?",
                answer:
                    "Approved business records and document boxes may be stored, subject to packaging, security and handling requirements.",
            },
            {
                question: "Can businesses arrange repeat collections?",
                answer:
                    "Recurring or additional collections may be supported depending on frequency, volume and location.",
            },
            {
                question: "Can stock be returned in stages?",
                answer:
                    "Staged return delivery may be arranged where items need to be delivered in phases rather than all at once.",
            },

{
    question: "Can business storage support seasonal campaigns or events?",
    answer:
        "Yes. Temporary storage can support event materials, displays, seasonal stock and promotional equipment before and after use.",
},

{
    question: "Can stored business items be labelled by project?",
    answer:
        "Items can be grouped or labelled by project, department, campaign, client or another agreed method.",
},
        ],
    },
    {
        id: "warehouse-storage",
        title: "Warehouse Storage",
        icon: "🏭",
        description: "Managed warehouse capacity for household belongings and commercial assets, combining collection, organised storage and scheduled return delivery without requiring customers to manage transport.",
        faqs: [
            {
                question: "What is managed warehouse storage?",
                answer:
                    "Managed warehouse storage combines collection, organised storage and return delivery rather than requiring customers to transport everything themselves.",
                link: {
                    href: "/warehouse-storage-london",
                    label: "View warehouse storage options",
                },
            },
            {
                question: "Is warehouse storage suitable for household items?",
                answer:
                    "Yes. Furniture, boxes, appliances and other approved household belongings can be stored.",
            },
            {
                question: "Is warehouse storage suitable for businesses?",
                answer:
                    "Yes. It can support inventory, office assets, pallets, equipment and temporary commercial overflow.",
            },
            {
                question: "Can I store bulky furniture?",
                answer:
                    "Bulky furniture may be accepted after the dimensions, access and handling requirements have been reviewed.",
            },
            {
                question: "Can items be collected from multiple locations?",
                answer:
                    "Multi-location collections may be possible and should be included when requesting a quotation.",
            },
            {
                question: "Can warehouse storage support a property-chain delay?",
                answer:
                    "Yes. Belongings can be collected and held until the new property is ready for delivery.",
            },
            {
                question: "Can warehouse storage support an office refurbishment?",
                answer:
                    "Yes. Furniture, equipment and approved business assets can be held while work is completed.",
            },
            {
                question: "Can storage volume change over time?",
                answer:
                    "Capacity may be adjusted if additional or fewer items need to be stored, subject to availability and revised pricing.",
            },
            {
                question: "How is return delivery arranged?",
                answer:
                    "Contact the team with the preferred date, destination and access information so delivery can be scheduled.",
            },
            {
                question: "Can items be delivered outside normal business hours?",
                answer:
                    "Alternative delivery times may be considered depending on availability, building access and the service required.",
            },

{
    question: "Can warehouse storage be used during an international relocation?",
    answer:
        "Yes. Approved belongings can be held while travel, shipping, accommodation or final delivery arrangements are completed.",
},

{
    question: "Can the warehouse receive items before my premises are ready?",
    answer:
        "Supplier or premises collections may be arranged before the destination is ready, subject to the agreed service and access requirements.",
},
        ],
    },
    {
        id: "student-storage",
        title: "Student Storage",
        icon: "🎓",
        description: "Student storage for summer breaks, hall changes, shared accommodation, luggage, boxes and small furniture, with collection and delivery coordinated around university dates.",
        faqs: [
            {
                question: "Do you provide student summer storage?",
                answer:
                    "Yes. KXH can collect belongings, store them during the summer and arrange delivery for the next term.",
                link: {
                    href: "/student-storage-london",
                    label: "Explore student storage",
                },
            },
            {
                question: "Can you collect from university halls?",
                answer:
                    "Yes, where access, loading and collection arrangements are confirmed.",
            },
            {
                question: "Can you collect from shared accommodation?",
                answer:
                    "Yes. Collections can be arranged from shared houses, flats and other approved student accommodation.",
            },
            {
                question: "Can students store luggage only?",
                answer:
                    "Luggage-only storage may be possible depending on availability and collection requirements.",
            },
            {
                question: "Can students store small furniture?",
                answer:
                    "Small furniture may be accepted after the size, access and handling requirements are reviewed.",
            },
            {
                question: "Can you deliver to a new accommodation address?",
                answer:
                    "Yes. Redelivery can be arranged to a new approved address when the next accommodation is ready.",
            },
            {
                question: "Can I book while travelling?",
                answer:
                    "You can request and manage arrangements remotely, provided collection, contact and delivery details are clear.",
            },
            {
                question: "Can friends or accommodation staff release my items?",
                answer:
                    "Another person may assist with collection if this is agreed in advance and access is authorised.",
            },
            {
                question: "How far ahead should students book?",
                answer:
                    "Book early around summer move-out and autumn move-in periods because those dates can be busy.",
            },
            {
                question: "Can student moving and storage be combined?",
                answer:
                    "Yes. Collection, transport, storage and next-term delivery can be planned as one connected service.",
            },

{
    question: "Can international students use KXH storage?",
    answer:
        "Yes. International students can arrange collection, storage and redelivery while travelling, provided local contacts and access instructions are clear.",
},

{
    question: "Can several students book together?",
    answer:
        "Group or shared-accommodation collections may be possible when each student's belongings are clearly identified and the access plan is agreed.",
},
        ],
    },
    {
        id: "inventory-management",
        title: "Inventory Management",
        icon: "🗂️",
        description: "Physical inventory organisation and storage for ecommerce, retail and operational stock, with collection, category or SKU-based organisation and staged delivery when required.",
        faqs: [
            {
                question: "What does inventory management mean at KXH?",
                answer:
                    "It refers to the physical organisation and storage of stock and operational items rather than software-only inventory management.",
                link: {
                    href: "/inventory-management-london",
                    label: "Learn about physical inventory management",
                },
            },
            {
                question: "Can inventory be organised by SKU?",
                answer:
                    "Stock may be organised by SKU, category, project, client or another agreed system.",
            },
            {
                question: "Can ecommerce stock be stored?",
                answer:
                    "Yes. Approved ecommerce inventory can be stored with collection and delivery arrangements based on the business workflow.",
            },
            {
                question: "Can retail stock be stored seasonally?",
                answer:
                    "Yes. Seasonal or overflow stock can be stored when retail premises do not have enough space.",
            },
            {
                question: "Can stock be collected from suppliers?",
                answer:
                    "Supplier collection may be possible depending on locations, access, volume and handling requirements.",
            },
            {
                question: "Can inventory be delivered in batches?",
                answer:
                    "Batch or staged delivery may be arranged based on operational needs and scheduling.",
            },
            {
                question: "Can damaged or unsuitable items be separated?",
                answer:
                    "Items may be grouped or separated according to agreed handling instructions.",
            },
            {
                question: "Can inventory capacity increase during peak periods?",
                answer:
                    "Additional capacity may be available during seasonal peaks, subject to warehouse availability.",
            },
            {
                question: "Can multiple product categories be stored?",
                answer:
                    "Yes, provided the goods are approved and the required organisation method is agreed.",
            },
            {
                question: "Is inventory software included?",
                answer:
                    "The primary service focuses on physical stock storage and handling. Any reporting or tracking requirements should be discussed during quotation.",
            },

{
    question: "Can promotional materials and displays be stored with inventory?",
    answer:
        "Approved display materials, packaging and promotional stock can be stored alongside inventory when suitable organisation requirements are agreed.",
},

{
    question: "Can inventory be transferred between business locations?",
    answer:
        "Collection and delivery between approved premises may be arranged as part of an inventory storage and logistics plan.",
},
        ],
    },
    {
        id: "pallet-storage",
        title: "Pallet Storage",
        icon: "🧱",
        description: "Flexible pallet storage for commercial inventory, overflow stock and operational goods, including collection, changing pallet quantities and onward or return delivery.",
        faqs: [
            {
                question: "Does KXH provide pallet storage?",
                answer:
                    "Yes. Pallet storage is available for approved commercial stock and business items.",
                link: {
                    href: "/pallet-storage-london",
                    label: "Explore pallet storage",
                },
            },
            {
                question: "How many pallets can I store?",
                answer:
                    "Capacity depends on current availability, pallet dimensions, weight and the type of goods.",
            },
            {
                question: "Can pallets be collected?",
                answer:
                    "Collection may be arranged from suppliers, warehouses, shops or other approved commercial locations.",
            },
            {
                question: "Can pallets be delivered later?",
                answer:
                    "Yes. Return or onward delivery can be scheduled when the stock is needed.",
            },
            {
                question: "Can pallet storage be short term?",
                answer:
                    "Yes. Short-term pallet storage can support overflow, delays, events, refits and seasonal demand.",
            },
            {
                question: "Can pallet storage be long term?",
                answer:
                    "Longer-term arrangements may be available for businesses needing ongoing capacity.",
            },
            {
                question: "Can pallet quantities change?",
                answer:
                    "Yes, subject to availability and revised pricing as stock levels increase or decrease.",
            },
            {
                question: "Are oversized pallets accepted?",
                answer:
                    "Oversized or non-standard pallets require review before acceptance.",
            },
            {
                question: "Can different product lines be separated?",
                answer:
                    "Pallets can be grouped or organised according to agreed stock categories.",
            },
            {
                question: "What pallet details are needed for a quote?",
                answer:
                    "Provide the pallet count, dimensions, approximate weight, type of goods, collection location and required storage period.",
            },

{
    question: "Can mixed pallets be stored?",
    answer:
        "Mixed pallets may be accepted if the goods are approved, safely packed and clearly documented.",
},

{
    question: "Can pallets be delivered directly to a customer or project site?",
    answer:
        "Onward delivery may be arranged to an approved destination when the route, access and unloading requirements are confirmed.",
},
        ],
    },
    {
        id: "collection-delivery",
        title: "Collection & Delivery",
        icon: "📍",
        description: "How household and commercial collections are planned, including multi-address jobs, parking, lifts, loading bays, authorised contacts, date changes and return deliveries.",
        faqs: [
            {
                question: "Can KXH collect from my home?",
                answer:
                    "Yes. Home collection can be arranged for moving, storage and furniture transport services.",
            },
            {
                question: "Can KXH collect from an office or business?",
                answer:
                    "Yes. Commercial collections can be planned around loading access, building rules and operating hours.",
            },
            {
                question: "Can you collect from multiple addresses?",
                answer:
                    "Multi-address collection may be possible and should be included in the quotation request.",
            },
            {
                question: "Can you deliver to multiple addresses?",
                answer:
                    "Split or multi-address delivery may be arranged depending on the items, route and schedule.",
            },
            {
                question: "What access information should I provide?",
                answer:
                    "Include stairs, lifts, loading bays, parking restrictions, entrance width, concierge rules and any timed access requirements.",
            },
            {
                question: "Can someone else be present for collection?",
                answer:
                    "Yes, provided the authorised person understands the agreed items and access arrangements.",
            },
            {
                question: "Can someone else receive the delivery?",
                answer:
                    "Yes, where the recipient and delivery instructions are confirmed in advance.",
            },
            {
                question: "Can I change the delivery address?",
                answer:
                    "Address changes may be possible if the new route, access and cost implications are reviewed before delivery.",
            },
            {
                question: "Can I change the delivery date?",
                answer:
                    "Date changes may be accommodated depending on notice, availability and the agreed booking.",
            },
            {
                question: "Do you provide same-day collection?",
                answer:
                    "Same-day support may occasionally be available, but it depends on capacity, location and the work required.",
            },

{
    question: "Will KXH contact me before arrival?",
    answer:
        "Collection and delivery communication follows the agreed booking arrangements. Ensure the provided phone number is available on the service date.",
},

{
    question: "What happens if there is no suitable parking?",
    answer:
        "Parking or loading restrictions should be disclosed in advance so alternative arrangements, permits, timing or additional handling can be reviewed.",
},
        ],
    },
    {
        id: "pricing",
        title: "Pricing",
        icon: "💷",
        description: "How KXH quotations are calculated using volume, labour, transport, access, storage duration and optional services, plus common questions about VAT, invoices and additional charges.",
        faqs: [
            {
                question: "How are KXH quotes calculated?",
                answer:
                    "Quotes are based on the service, volume, locations, distance, access, labour, vehicle needs, storage period and optional extras.",
            },
            {
                question: "Do you charge by property size?",
                answer:
                    "Property size is one factor, but item volume, access, labour and transport requirements also affect the quotation.",
            },
            {
                question: "Do you charge by storage volume?",
                answer:
                    "Storage pricing may reflect the amount and type of space required, collection, handling and the storage period.",
            },
            {
                question: "Are packing materials included?",
                answer:
                    "Packing materials are included only when specified in the agreed quotation.",
            },
            {
                question: "Does weekend service cost more?",
                answer:
                    "Weekend pricing may differ depending on demand, availability and the service required.",
            },
            {
                question: "Are there hidden charges?",
                answer:
                    "The quotation should describe the agreed service scope. Additional work or changes may require revised pricing.",
            },
            {
                question: "Is a deposit required?",
                answer:
                    "Payment requirements depend on the service and booking terms provided with the quotation.",
            },
            {
                question: "Is VAT included?",
                answer:
                    "Check the quotation to confirm how VAT is presented for the specific service.",
            },
            {
                question: "Can businesses receive an invoice?",
                answer:
                    "Business invoicing may be available depending on the agreed payment terms.",
            },
            {
                question: "What can make a quote change?",
                answer:
                    "Changes to volume, addresses, dates, access, labour, storage duration or optional services can affect the final price.",
            },

{
    question: "Can I get a quote before confirming my moving date?",
    answer:
        "Yes. An indicative or tailored quotation can be prepared using the expected date, although availability and pricing may need confirmation later.",
},

{
    question: "Does difficult access affect the price?",
    answer:
        "Yes. Long carrying distances, stairs, restricted lifts, narrow entrances and limited parking can increase labour or time requirements.",
},
        ],
    },
    {
        id: "booking",
        title: "Booking",
        icon: "📅",
        description: "What customers need to provide when booking, how dates are confirmed and what happens when services, addresses, dates or booking requirements change.",
        faqs: [
            {
                question: "How far in advance should I book?",
                answer:
                    "Book as early as practical, especially for weekends, month-end moves, student changeovers and larger commercial jobs.",
            },
            {
                question: "What information is needed to book?",
                answer:
                    "Provide contact details, service type, addresses, dates, item volume, access information and any packing or storage requirements.",
            },
            {
                question: "Is a quote the same as a confirmed booking?",
                answer:
                    "No. A booking is confirmed only after the required acceptance and payment steps have been completed.",
            },
            {
                question: "Can I change my booking?",
                answer:
                    "Contact the team as soon as possible. Changes are subject to availability and may affect pricing.",
            },
            {
                question: "Can I cancel my booking?",
                answer:
                    "Cancellation is subject to the terms provided with the quotation or booking confirmation.",
            },
            {
                question: "Can I add services after booking?",
                answer:
                    "Packing, storage or additional handling may be added if availability and timing allow.",
            },
            {
                question: "Can I book on behalf of someone else?",
                answer:
                    "Yes, provided the payer, customer, collection contact and delivery contact are clearly identified.",
            },
            {
                question: "Can businesses make recurring bookings?",
                answer:
                    "Recurring collection, storage or delivery arrangements may be discussed with the team.",
            },
            {
                question: "When is my preferred date confirmed?",
                answer:
                    "The date is confirmed as part of the completed booking process, subject to availability.",
            },
            {
                question: "What happens after I request a quote?",
                answer:
                    "The team reviews your information, may ask follow-up questions and then provides the proposed scope and price.",
            },

{
    question: "Can I reserve a date while final details are pending?",
    answer:
        "Date-holding arrangements depend on availability and booking terms. Ask the team what is required to secure the preferred date.",
},

{
    question: "Will I receive written confirmation?",
    answer:
        "Confirmed bookings should include the agreed service information, dates and relevant payment or preparation requirements.",
},
        ],
    },
    {
        id: "security",
        title: "Security & Item Care",
        icon: "🔒",
        description: "How belongings and business assets should be prepared, packed, handled and stored, including fragile items, appliances, documents and questions about liability or insurance.",
        faqs: [
            {
                question: "How are belongings protected during moving?",
                answer:
                    "The agreed service may include suitable packing, furniture coverings, careful loading and secure placement during transport.",
            },
            {
                question: "How are items protected in storage?",
                answer:
                    "Items should be appropriately packed and are handled according to the agreed storage service.",
            },
            {
                question: "Should fragile items be declared?",
                answer:
                    "Yes. Identify fragile, valuable, awkward or high-care items before quotation so handling requirements can be reviewed.",
            },
            {
                question: "Can KXH pack fragile belongings?",
                answer:
                    "Professional packing may be available for fragile items when included in the service scope.",
            },
            {
                question: "Are my belongings insured?",
                answer:
                    "Ask the team to explain the applicable protection, liability and insurance arrangements for your booking.",
            },
            {
                question: "Can confidential documents be stored?",
                answer:
                    "Approved documents may be stored if packed and handled according to the agreed requirements.",
            },
            {
                question: "Do you provide secure document disposal?",
                answer:
                    "KXH offers shredding solutions for unwanted confidential documents.",
                link: {
                    href: "/shredding-solutions-london",
                    label: "Explore shredding solutions",
                },
            },
            {
                question: "Should appliances be prepared before collection?",
                answer:
                    "Appliances should be emptied, cleaned, disconnected and prepared according to the manufacturer's guidance.",
            },
            {
                question: "How should mattresses and soft furnishings be packed?",
                answer:
                    "Protective covers are recommended to help keep soft furnishings clean during handling and storage.",
            },
            {
                question: "What should I keep with me?",
                answer:
                    "Keep passports, medication, keys, valuables, important documents and essential personal items with you.",
            },

{
    question: "Can valuable items be stored?",
    answer:
        "High-value items must be declared before booking so suitability, packing, liability and any special handling requirements can be reviewed.",
},

{
    question: "Can furniture be wrapped before collection?",
    answer:
        "Furniture coverings or wrapping may be included where agreed as part of the packing or moving service.",
},
        ],
    },
    {
        id: "coverage",
        title: "London Coverage",
        icon: "🗺️",
        description: "London coverage guidance for Central and Greater London, borough-to-borough moves, controlled parking zones, commercial buildings and selected routes beyond London.",
        faqs: [
            {
                question: "Which London boroughs does KXH cover?",
                answer:
                    "KXH supports approved locations across multiple London boroughs. Enter the collection and delivery postcodes when requesting a quote.",
            },
            {
                question: "Do you cover Central London?",
                answer:
                    "Central London services may be available, subject to congestion, parking, loading and building-access requirements.",
            },
            {
                question: "Do you cover Greater London?",
                answer:
                    "Many Greater London locations may be supported depending on service type and availability.",
            },
            {
                question: "Can you travel outside London?",
                answer:
                    "Some collection or delivery jobs outside London may be considered after the route and requirements are reviewed.",
            },
            {
                question: "Do you serve apartment buildings?",
                answer:
                    "Yes. Lift bookings, concierge rules, loading bays and restricted access should be provided in advance.",
            },
            {
                question: "Do you serve commercial buildings?",
                answer:
                    "Yes. Commercial collections and deliveries can be planned around loading areas and building-management requirements.",
            },
            {
                question: "Can you collect inside the Congestion Charge Zone?",
                answer:
                    "Collections may be possible, but access, parking, congestion and timing requirements need to be considered.",
            },
            {
                question: "Can you collect from controlled parking zones?",
                answer:
                    "Yes, where suitable parking or loading arrangements can be made.",
            },
            {
                question: "Can you support moves between London boroughs?",
                answer:
                    "Yes. KXH supports many moves between boroughs, subject to route and service availability.",
                link: {
                    href: "/logistics-moving-london",
                    label: "View London moving services",
                },
            },
            {
                question: "How do I confirm whether my postcode is covered?",
                answer:
                    "Include both postcodes in the quote form so the team can review the route and availability.",
                link: {
                    href: "/get-a-quote",
                    label: "Check your locations",
                },
            },

{
    question: "Do you serve universities and student accommodation across London?",
    answer:
        "Collections may be arranged from approved halls, private student residences and shared accommodation across supported London areas.",
},

{
    question: "Can you collect from storage facilities or warehouses?",
    answer:
        "Yes, subject to site access, release procedures, loading arrangements and the items being suitable for the requested service.",
},
        ],
    },
];


const relatedServicesByCategory: Record<
    string,
    { title: string; href: string; description: string }[]
> = {
    general: [
        { title: "All Services", href: "/services", description: "Explore KXH moving, storage and logistics solutions." },
        { title: "Request a Quote", href: "/get-a-quote", description: "Tell us what you need and receive a tailored quotation." },
    ],
    moving: [
        { title: "Moving Services London", href: "/logistics-moving-london", description: "Managed house, apartment, office and commercial moves." },
        { title: "Warehouse Storage London", href: "/warehouse-storage-london", description: "Temporary storage when moving dates do not align." },
    ],
    storage: [
        { title: "Warehouse Storage London", href: "/warehouse-storage-london", description: "Managed collection, storage and redelivery." },
        { title: "Student Storage London", href: "/student-storage-london", description: "Flexible storage around university dates." },
    ],
    "business-storage": [
        { title: "Business Storage London", href: "/business-storage-london", description: "Storage for stock, equipment, furniture and archives." },
        { title: "Inventory Management London", href: "/inventory-management-london", description: "Organised physical inventory storage and handling." },
    ],
    "warehouse-storage": [
        { title: "Warehouse Storage London", href: "/warehouse-storage-london", description: "Managed warehouse capacity for households and businesses." },
        { title: "Pallet Storage London", href: "/pallet-storage-london", description: "Flexible pallet capacity for commercial stock." },
    ],
    "student-storage": [
        { title: "Student Storage London", href: "/student-storage-london", description: "Collection, summer storage and next-term delivery." },
        { title: "Moving Services London", href: "/logistics-moving-london", description: "Support for student and accommodation moves." },
    ],
    "inventory-management": [
        { title: "Inventory Management London", href: "/inventory-management-london", description: "Physical stock organisation and storage." },
        { title: "Business Storage London", href: "/business-storage-london", description: "Flexible commercial storage capacity." },
    ],
    "pallet-storage": [
        { title: "Pallet Storage London", href: "/pallet-storage-london", description: "Commercial pallet collection, storage and delivery." },
        { title: "Warehouse Storage London", href: "/warehouse-storage-london", description: "Managed warehouse capacity for larger requirements." },
    ],
    "collection-delivery": [
        { title: "Moving Services London", href: "/logistics-moving-london", description: "Collection, transport and delivery for moves." },
        { title: "Warehouse Storage London", href: "/warehouse-storage-london", description: "Storage with collection and return delivery." },
    ],
    pricing: [
        { title: "Request a Quote", href: "/get-a-quote", description: "Receive pricing based on your actual requirements." },
        { title: "Contact KXH", href: "/contact", description: "Discuss access, dates, items and service options." },
    ],
    booking: [
        { title: "Request a Quote", href: "/get-a-quote", description: "Start your booking with a tailored quotation." },
        { title: "Contact KXH", href: "/contact", description: "Ask about dates, changes and availability." },
    ],
    security: [
        { title: "Warehouse Storage London", href: "/warehouse-storage-london", description: "Learn about managed storage and item handling." },
        { title: "Shredding Solutions London", href: "/shredding-solutions-london", description: "Secure disposal for confidential documents." },
    ],
    coverage: [
        { title: "Moving Services London", href: "/logistics-moving-london", description: "Explore borough-based moving support." },
        { title: "Request a Quote", href: "/get-a-quote", description: "Submit your postcodes to confirm availability." },
    ],
};

const popularQuestions = [
    { label: "How much do moving services cost?", href: "#moving-how-much-do-moving-services-cost" },
    { label: "How does managed storage work?", href: "#storage-how-does-managed-storage-work" },
    { label: "Can moving and storage be combined?", href: "#moving-can-moving-and-storage-be-combined" },
    { label: "Which London boroughs does KXH cover?", href: "#coverage-which-london-boroughs-does-kxh-cover" },
    { label: "How do I request a quote?", href: "#general-how-do-i-request-a-quote" },
];

function toId(sectionId: string, question: string) {
    return `${sectionId}-${question}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}


function FAQJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": "https://kxhlogistics.co.uk/faqs#faq",
        url: "https://kxhlogistics.co.uk/faqs",
        name: "KXH Storage, Moving and Logistics Frequently Asked Questions",
        mainEntity: sections.flatMap((section) =>
            section.faqs.map((faq) => ({
                "@type": "Question",
                name: faq.question,
                acceptedAnswer: {
                    "@type": "Answer",
                    text: faq.answer,
                },
            })),
        ),
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

function BreadcrumbJsonLd() {
    const data = {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://kxhlogistics.co.uk",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Frequently Asked Questions",
                item: "https://kxhlogistics.co.uk/faqs",
            },
        ],
    };

    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
    );
}

export default function FAQsPage() {
    return (
        <>
            <CrispChat />
            <Nav />
            <FAQJsonLd />
            <BreadcrumbJsonLd />

            <FAQsClient
                sections={sections}
                serviceShortcuts={serviceShortcuts}
                popularQuestions={popularQuestions}
                relatedServicesByCategory={relatedServicesByCategory}
                lastUpdated="July 2026"
            />

            <MainFooter locations={londonLocations} />
        </>
    );
}
