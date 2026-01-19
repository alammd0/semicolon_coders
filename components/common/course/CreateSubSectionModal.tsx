

import { useState } from "react";

export default function CreateSubSectionModal({ subSectionName, changeHandler, handleCreate, handleCancel } : { subSectionName : string, changeHandler : (e : React.ChangeEvent<HTMLInputElement>) => void, handleCreate : () => void, handleCancel : () => void }) {

    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!subSectionName.trim()) {
            newErrors.sectionName = "Section name is required";
        }
        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e : React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (validateForm()) {
            handleCreate();
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg">
                {/* header */}
                <div className="mb-6 text-center">
                    <h2 className="text-2xl font-bold text-gray-800">Create New Lesson</h2>
                    <p className="text-gray-500 mt-1">Add a new lesson to this section</p>
                </div>

                {/* form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="sectionName" className="block text-sm font-medium text-foreground mb-2">
                            Section Name <sup className="text-red-500">*</sup>
                        </label>
                        <input
                            id="sectionName"
                            name="sectionName"
                            value={subSectionName}
                            onChange={changeHandler}
                            placeholder="e.g. Lesson Name"
                            className={
                                `w-full rounded-md border px-3 py-2 text-sm focus:border-[#F9C505] focus:ring-2 focus:ring-[#F9C505]/20 focus:outline-none ${errors.sectionName ? "border-red-500" : "border-gray-300"}`
                            }
                        />
                        {errors.sectionName && <p className="text-sm text-red-500 mt-1">{errors.sectionName}</p>}
                    </div>

                    <div className="flex justify-end gap-4 pt-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-6 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-50"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-6 py-2 bg-[#F9C505] text-black font-bold rounded-md shadow-sm hover:bg-opacity-90"
                        >
                            Create Lesson
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}