"use client";

import {
    useMemo,
    useState,
} from "react";

import {
    Plus,
    Mail,
    Pencil,
    Trash2,
    Package,
    X,
    Printer
} from "lucide-react";

import { toast } from "sonner";

import {
    createInventoryItem,
    updateInventoryItem,
    deleteInventoryItem,
    sendInventoryAccessLink
} from "./inventory-actions";


type InventoryItem = {
    id: string;
    name: string;
    quantity: number;
    description: string | null;
    condition: string | null;
    location: string | null;
    notes: string | null;
    imageUrl: string | null;
};


type Props = {
    orderId: string;
    customerEmail: string | null;
    items: InventoryItem[];
    onRefresh: () => Promise<void>;
};

function InventoryRow({
    item,
    onEdit,
    onDelete,
}: {
    item: InventoryItem;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <tr>

            {item.imageUrl && (
                <td className="p-3">
                    <div className="flex items-center gap-3">
                        <img
                            src={
                                item.imageUrl
                            }
                            alt={
                                item.name
                            }
                            className="mb-2 h-14 w-14 rounded-lg object-cover"
                        />
                    </div>
                </td>
            )}
            <td className="p-3">
                <div className="font-medium text-slate-900">
                    {item.name}
                </div>

                {item.description && (
                    <div className="mt-1 text-xs text-slate-500">
                        {item.description}
                    </div>
                )}
            </td>

            <td className="p-3 text-right font-semibold text-slate-900">
                {item.quantity}
            </td>

            <td className="p-3 text-slate-600">
                {item.condition || "—"}
            </td>

            <td className="p-3 text-slate-600">
                {item.location || "—"}
            </td>

            <td className="p-3">
                <div className="flex justify-end gap-1">
                    <button
                        type="button"
                        onClick={onEdit}
                        className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
                    >
                        <Pencil className="h-4 w-4" />
                    </button>

                    <button
                        type="button"
                        onClick={onDelete}
                        className="rounded-lg p-2 text-rose-500 hover:bg-rose-50 hover:text-rose-700"
                    >
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </td>
        </tr >
    );
}

function InventoryCard({
    item,
    onEdit,
    onDelete,
}: {
    item: InventoryItem;
    onEdit: () => void;
    onDelete: () => void;
}) {
    return (
        <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    {item.imageUrl && (
                        <div className="mb-4 overflow-hidden rounded-xl">
                            <img
                                src={
                                    item.imageUrl
                                }
                                alt={
                                    item.name
                                }
                                className="aspect-[16/9] w-full object-cover"
                            />
                        </div>
                    )}
                    <div className="font-semibold text-slate-900">
                        {item.name}
                    </div>

                    {item.description && (
                        <div className="mt-1 text-sm text-slate-500">
                            {item.description}
                        </div>
                    )}
                </div>

                <div className="shrink-0 rounded-lg bg-white px-3 py-1 text-sm font-bold text-slate-900 shadow-sm">
                    ×{item.quantity}
                </div>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <div>
                    <div className="text-xs text-slate-400">
                        Condition
                    </div>

                    <div className="font-medium text-slate-700">
                        {item.condition ||
                            "—"}
                    </div>
                </div>

                <div>
                    <div className="text-xs text-slate-400">
                        Location
                    </div>

                    <div className="font-medium text-slate-700">
                        {item.location ||
                            "—"}
                    </div>
                </div>
            </div>

            <div className="mt-4 flex gap-2 border-t border-slate-200 pt-3">
                <button
                    type="button"
                    onClick={onEdit}
                    className="flex-1 rounded-lg border border-slate-200 bg-white py-2 text-sm font-semibold text-slate-700"
                >
                    Edit
                </button>

                <button
                    type="button"
                    onClick={onDelete}
                    className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-semibold text-rose-700"
                >
                    Delete
                </button>
            </div>
        </div>
    );
}

function InventoryItemModal({
    orderId,
    item,
    onClose,
    onSaved,
}: {
    orderId: string;
    item: InventoryItem | null;
    onClose: () => void;
    onSaved: () => Promise<void>;
}) {
    const [name, setName] =
        useState(item?.name ?? "");

    const [quantity, setQuantity] =
        useState(
            item?.quantity ?? 1
        );

    const [condition, setCondition] =
        useState(
            item?.condition ?? ""
        );

    const [location, setLocation] =
        useState(
            item?.location ?? ""
        );

    const [description, setDescription] =
        useState(
            item?.description ?? ""
        );

    const [notes, setNotes] =
        useState(
            item?.notes ?? ""
        );

    const [imageFile, setImageFile] =
        useState<File | null>(null);
    const [previewUrl, setPreviewUrl] =
        useState<string | null>(
            item?.imageUrl ?? null
        );

    const [saving, setSaving] =
        useState(false);

    const [removeImage, setRemoveImage] =
        useState(false);

    async function uploadImage(
        file: File
    ) {
        const formData =
            new FormData();

        formData.append(
            "file",
            file
        );

        formData.append(
            "orderId",
            orderId
        );


        const response =
            await fetch(
                "/api/admin/inventory/upload",
                {
                    method: "POST",
                    body:
                        formData,
                }
            );


        const data =
            await response.json();


        if (!response.ok) {
            throw new Error(
                data?.error ??
                "Failed to upload image."
            );
        }


        return data.imageUrl as string;
    }

    async function handleSave() {
        const trimmedName =
            name.trim();

        if (!trimmedName) {
            toast.error(
                "Item name is required."
            );

            return;
        }


        if (quantity < 1) {
            toast.error(
                "Quantity must be at least 1."
            );

            return;
        }

        let imageUrl =
            item?.imageUrl ?? null;

        if (removeImage) {
            imageUrl = null;
        }

        if (imageFile) {
            imageUrl =
                await uploadImage(
                    imageFile
                );
        }

        setSaving(true);

        try {
            const input = {
                name:
                    trimmedName,

                quantity,

                condition:
                    condition.trim() ||
                    null,

                location:
                    location.trim() ||
                    null,

                description:
                    description.trim() ||
                    null,

                notes:
                    notes.trim() ||
                    null,

                /*
                 * For now preserve an existing
                 * persisted image.
                 *
                 * New File uploads will be wired
                 * to storage separately.
                 */
                imageUrl
            };


            const result =
                item
                    ? await updateInventoryItem(
                        item.id,
                        input
                    )
                    : await createInventoryItem(
                        orderId,
                        input
                    );


            if (!result.success) {
                toast.error(
                    result.error ??
                    "Failed to save inventory item."
                );

                return;
            }


            toast.success(
                item
                    ? "Inventory item updated."
                    : "Inventory item added."
            );

            onClose();
            await onSaved();


        } catch (error: unknown) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to save inventory item."
            );
        } finally {
            setSaving(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
            <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                    <div>
                        <h3 className="font-semibold text-slate-900">
                            {item
                                ? "Edit Inventory Item"
                                : "Add Inventory Item"}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                            Record an item stored
                            under this order.
                        </p>
                    </div>

                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-lg p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
                    >
                        <X className="h-5 w-5" />
                    </button>
                </div>


                <div className="space-y-4 p-5">
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">
                            Item name
                        </label>

                        <input
                            value={name}
                            onChange={(e) =>
                                setName(
                                    e.target.value
                                )
                            }
                            placeholder="e.g. Dining Chair"
                            className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100"
                        />
                    </div>


                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <label className="mb-1 block text-sm font-semibold text-slate-700">
                                Quantity
                            </label>

                            <input
                                type="number"
                                min={1}
                                value={quantity}
                                onChange={(e) =>
                                    setQuantity(
                                        Math.max(
                                            1,
                                            Number(
                                                e.target.value
                                            ) || 1
                                        )
                                    )
                                }
                                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm"
                            />
                        </div>

                        <div>
                            <label className="mb-1 block text-sm font-semibold text-slate-700">
                                Condition
                            </label>

                            <input
                                value={
                                    condition
                                }
                                onChange={(e) =>
                                    setCondition(
                                        e.target.value
                                    )
                                }
                                placeholder="Good"
                                className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm"
                            />
                        </div>
                    </div>


                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">
                            Storage location
                        </label>

                        <input
                            value={location}
                            onChange={(e) =>
                                setLocation(
                                    e.target.value
                                )
                            }
                            placeholder="e.g. Rack A"
                            className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm"
                        />
                    </div>


                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">
                            Description
                        </label>

                        <input
                            value={
                                description
                            }
                            onChange={(e) =>
                                setDescription(
                                    e.target.value
                                )
                            }
                            placeholder="e.g. Black dining chair"
                            className="h-11 w-full rounded-xl border border-slate-300 px-3 text-sm"
                        />
                    </div>


                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">
                            Notes
                        </label>

                        <textarea
                            value={notes}
                            onChange={(e) =>
                                setNotes(
                                    e.target.value
                                )
                            }
                            rows={3}
                            placeholder="Optional notes..."
                            className="w-full rounded-xl border border-slate-300 px-3 py-2 text-sm"
                        />
                    </div>
                    <div>
                        <label className="mb-1 block text-sm font-semibold text-slate-700">
                            Item Photo
                        </label>

                        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-4">
                            {previewUrl ? (
                                <div className="space-y-3">
                                    <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-slate-100">
                                        <img
                                            src={previewUrl}
                                            alt="Inventory preview"
                                            className="h-full w-full object-cover"
                                        />
                                    </div>

                                    <div className="flex gap-2">
                                        <label className="cursor-pointer rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50">
                                            Change Photo

                                            <input
                                                type="file"
                                                accept="image/jpeg,image/png,image/webp"
                                                className="hidden"
                                                onChange={(e) => {
                                                    const file =
                                                        e.target.files?.[0];

                                                    if (!file) {
                                                        return;
                                                    }

                                                    setImageFile(file);
                                                    setRemoveImage(false);

                                                    setPreviewUrl(
                                                        URL.createObjectURL(
                                                            file
                                                        )
                                                    );
                                                }}
                                            />
                                        </label>

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setImageFile(null);
                                                setPreviewUrl(null);
                                                setRemoveImage(true);
                                            }}
                                            className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm font-semibold text-rose-700"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <label className="flex cursor-pointer flex-col items-center justify-center py-6 text-center">
                                    <div className="text-sm font-semibold text-slate-700">
                                        Upload item photo
                                    </div>

                                    <div className="mt-1 text-xs text-slate-500">
                                        JPG, PNG or WebP
                                    </div>

                                    <div className="mt-3 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-emerald-700 shadow-sm">
                                        Choose Photo
                                    </div>

                                    <input
                                        type="file"
                                        accept="image/jpeg,image/png,image/webp"
                                        className="hidden"
                                        onChange={(e) => {
                                            const file =
                                                e.target.files?.[0];

                                            if (!file) return;

                                            setImageFile(file);

                                            setPreviewUrl(
                                                URL.createObjectURL(
                                                    file
                                                )
                                            );
                                        }}
                                    />
                                </label>
                            )}
                        </div>
                    </div>
                </div>
                <div className="flex justify-end gap-2 border-t border-slate-200 px-5 py-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700"
                    >
                        Cancel
                    </button>

                    <button
                        type="button"
                        onClick={handleSave}
                        disabled={saving}
                        className="h-10 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {saving
                            ? item
                                ? "Saving..."
                                : "Adding..."
                            : item
                                ? "Save Changes"
                                : "Add Item"}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default function OrderInventoryManager({
    orderId,
    customerEmail,
    items,
    onRefresh
}: Props) {

    const [deletingId, setDeletingId] =
        useState<string | null>(
            null
        );
    const [showForm, setShowForm] =
        useState(false);

    const [editingItem, setEditingItem] =
        useState<InventoryItem | null>(
            null
        );

    const [sendingLink, setSendingLink] =
        useState(false);

    const [removeImage, setRemoveImage] =
        useState(false);


    const totalQuantity =
        useMemo(
            () =>
                items.reduce(
                    (sum, item) =>
                        sum + item.quantity,
                    0
                ),
            [items]
        );


    async function handleSendLink() {
        if (!customerEmail) {
            toast.error(
                "Customer has no email address."
            );

            return;
        }


        if (items.length === 0) {
            toast.error(
                "Add at least one inventory item before sending the link."
            );

            return;
        }


        setSendingLink(true);


        try {
            const result =
                await sendInventoryAccessLink(
                    orderId
                );


            if (!result.success) {
                toast.error(
                    result.error ??
                    "Failed to send inventory link."
                );

                return;
            }


            toast.success(
                `Inventory link sent to ${customerEmail}.`
            );


            await onRefresh?.();

        } catch (error: unknown) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to send inventory link."
            );
        } finally {
            setSendingLink(false);
        }
    }

    async function handleDelete(
        item: InventoryItem
    ) {
        const confirmed =
            window.confirm(
                `Delete "${item.name}" from this inventory?`
            );

        if (!confirmed) {
            return;
        }


        setDeletingId(
            item.id
        );

        try {
            const result =
                await deleteInventoryItem(
                    item.id
                );


            if (!result.success) {
                toast.error(
                    result.error ??
                    "Failed to delete inventory item."
                );

                return;
            }


            toast.success(
                "Inventory item deleted."
            );

            await onRefresh();

        } catch (error: unknown) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : "Failed to delete inventory item."
            );
        } finally {
            setDeletingId(
                null
            );
        }
    }


    return (
        <>
            <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                {/* Header */}
                <div className="flex flex-col gap-4 border-b border-slate-200 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <div className="flex items-center gap-2">
                            <Package className="h-5 w-5 text-emerald-700" />

                            <h2 className="font-semibold text-slate-900">
                                Stored Inventory
                            </h2>
                        </div>

                        <p className="mt-1 text-sm text-slate-500">
                            Items recorded for this
                            storage order.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        <button
                            type="button"
                            onClick={() => {
                                setEditingItem(null);
                                setShowForm(true);
                            }}
                            className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white hover:bg-emerald-800"
                        >
                            <Plus className="h-4 w-4" />

                            Add Item
                        </button>

                        <button
                            type="button"
                            disabled={
                                sendingLink ||
                                !customerEmail
                            }
                            onClick={
                                handleSendLink
                            }
                            className="inline-flex h-10 items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 px-4 text-sm font-semibold text-emerald-800 hover:bg-emerald-100 disabled:opacity-50"
                        >
                            <Mail className="h-4 w-4" />

                            {sendingLink
                                ? "Sending..."
                                : "Send Inventory Link"}
                        </button>
                        <button
                            type="button"
                            onClick={() => {
                                window.open(
                                    `/admin/orders/${orderId}/inventory-label`,
                                    "_blank"
                                );
                            }}
                            className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50"
                        >
                            <Printer className="h-4 w-4" />

                            Print QR Label
                        </button>
                    </div>
                </div>


                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 p-4">
                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Inventory Lines
                        </div>

                        <div className="mt-1 text-xl font-bold text-slate-900">
                            {items.length}
                        </div>
                    </div>

                    <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
                        <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                            Total Units
                        </div>

                        <div className="mt-1 text-xl font-bold text-slate-900">
                            {totalQuantity}
                        </div>
                    </div>
                </div>


                {/* Desktop table */}
                <div className="hidden border-t border-slate-200 md:block">
                    <table className="w-full text-sm">
                        <thead className="bg-slate-50 text-slate-600">
                            <tr>
                                <th className="p-3 text-left">
                                    Item
                                </th>

                                <th className="p-3 text-right">
                                    Qty
                                </th>

                                <th className="p-3 text-left">
                                    Condition
                                </th>

                                <th className="p-3 text-left">
                                    Location
                                </th>

                                <th className="p-3 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-slate-200">
                            {items.length > 0 ? (
                                items.map(
                                    (item) => (
                                        <InventoryRow
                                            key={item.id}
                                            item={item}

                                            onEdit={() => {
                                                setEditingItem(
                                                    item
                                                );

                                                setShowForm(
                                                    true
                                                );
                                            }}

                                            onDelete={() =>
                                                handleDelete(
                                                    item
                                                )
                                            }
                                        />
                                    )
                                )
                            ) : (
                                <tr>
                                    <td
                                        colSpan={5}
                                        className="p-8 text-center text-sm text-slate-500"
                                    >
                                        No inventory items added yet.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>


                {/* Mobile cards */}
                <div className="space-y-3 border-t border-slate-200 p-4 md:hidden">
                    {items.length > 0 ? (
                        items.map(
                            (item) => (
                                <InventoryCard
                                    key={item.id}
                                    item={item}

                                    onEdit={() => {
                                        setEditingItem(
                                            item
                                        );

                                        setShowForm(
                                            true
                                        );
                                    }}

                                    onDelete={() =>
                                        handleDelete(
                                            item
                                        )
                                    }
                                />
                            )
                        )
                    ) : (
                        <div className="rounded-xl border border-dashed border-slate-300 p-8 text-center">
                            <Package className="mx-auto h-8 w-8 text-slate-300" />

                            <div className="mt-3 text-sm font-medium text-slate-700">
                                No inventory yet
                            </div>

                            <div className="mt-1 text-sm text-slate-500">
                                Add the customer&apos;s
                                stored items here.
                            </div>
                        </div>
                    )}
                </div>


                {/* Customer access */}
                <div className="border-t border-slate-200 bg-slate-50 p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <div className="text-sm font-semibold text-slate-900">
                                Customer Inventory
                                Access
                            </div>

                            <div className="mt-1 text-sm text-slate-500">
                                {customerEmail
                                    ? `Secure inventory links will be sent to ${customerEmail}.`
                                    : "Customer email is not available."}
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled={
                                sendingLink ||
                                !customerEmail
                            }
                            onClick={
                                handleSendLink
                            }
                            className="h-10 rounded-xl border border-slate-300 bg-white px-4 text-sm font-semibold text-slate-700 hover:bg-slate-50 disabled:opacity-50"
                        >
                            {sendingLink
                                ? "Sending..."
                                : "Generate & Send Link"}
                        </button>
                    </div>
                </div>
            </section>


            {showForm && (
                <InventoryItemModal
                    orderId={orderId}
                    item={editingItem}

                    onSaved={async () => {
                        await onRefresh();
                    }}

                    onClose={() => {
                        setShowForm(false);
                        setEditingItem(null);
                    }}
                />
            )}
        </>
    );
}