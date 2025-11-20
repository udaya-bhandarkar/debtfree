import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Budget } from "../types";

interface EditBudgetDialogProps {
    isOpen: boolean;
    onClose: () => void;
    budget: Budget;
    onSave: (newBudget: Budget) => void;
}

export function EditBudgetDialog({ isOpen, onClose, budget, onSave }: EditBudgetDialogProps) {
    const [formData, setFormData] = useState<Budget>(budget);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: parseFloat(value) || 0,
        }));
    };

    const handleSave = () => {
        onSave(formData);
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit Budget</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="monthlyIncome" className="text-right">
                            Income
                        </Label>
                        <Input
                            id="monthlyIncome"
                            name="monthlyIncome"
                            type="number"
                            value={formData.monthlyIncome}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="rent" className="text-right">
                            Rent
                        </Label>
                        <Input
                            id="rent"
                            name="rent"
                            type="number"
                            value={formData.rent}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="bills" className="text-right">
                            Bills
                        </Label>
                        <Input
                            id="bills"
                            name="bills"
                            type="number"
                            value={formData.bills}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="tuition" className="text-right">
                            Tuition
                        </Label>
                        <Input
                            id="tuition"
                            name="tuition"
                            type="number"
                            value={formData.tuition}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="visaBuffer" className="text-right">
                            Visa Buffer
                        </Label>
                        <Input
                            id="visaBuffer"
                            name="visaBuffer"
                            type="number"
                            value={formData.visaBuffer}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="debtRepayment" className="text-right">
                            Debt Repay
                        </Label>
                        <Input
                            id="debtRepayment"
                            name="debtRepayment"
                            type="number"
                            value={formData.debtRepayment}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" onClick={handleSave}>Save changes</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
