import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { updateLoanType } from "../../services/LoanTypeService";

const loanTypeFormSchema = z.object({
    type: z.string().min(3),
    maxLoan: z.string().min(0),
});

const LoanTypeModal = ({ isOpen, onClose, isEditable, loanType }) => {
    const [error, errorSet] = useState(null);
    const [loading, loadingSet] = useState(false);

    const initialValue = {
        type: loanType?.type || '',
        maxLoan: loanType?.maxLoan || 0,
    }

    const form = useForm({
        defaultValues: initialValue,
        resolver: zodResolver(loanTypeFormSchema),
    });

    useEffect(() => {
        form.reset(initialValue);
    }, [loanType]);

    const onSubmit = async (data) => {
        loadingSet(true);
        data.id = loanType.id;
        try {
            const response = await updateLoanType(data);
            if (response.status === 200) {
                onClose();
            }
        } catch (error) {
            errorSet(error);
        }
        loadingSet(false);
    }

    return (
        <Modal
            size='lg'
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">View Loan Type</ModalHeader>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <ModalBody>
                                {error && (
                                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-md" role="alert">
                                        <p className="font-bold">ERROR!!</p>
                                        <p>Something went wrong</p>
                                    </div>
                                )}
                                <Controller
                                    control={form.control}
                                    name="type"
                                    render={({ field, fieldState }) => (
                                        <Input
                                            {...field}
                                            label="Loan Type"
                                            isDisabled={!isEditable}
                                            isInvalid={fieldState.error}
                                            errorMessage={fieldState.error?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="maxLoan"
                                    render={({ field, fieldState }) => (
                                        <Input
                                            {...field}
                                            label="Max Loan"
                                            isDisabled={!isEditable}
                                            isInvalid={fieldState.error}
                                            errorMessage={fieldState.error?.message}
                                        />
                                    )}
                                />
                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light"
                                    onPress={() => {
                                        form.reset(initialValue);
                                        onClose();
                                    }}>
                                    Close
                                </Button>
                                {isEditable && (
                                    <Button color="primary" type="submit" disabled={loading}>
                                        {loading ? 'Updating...' : 'Update'}
                                    </Button>
                                )}
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

export default LoanTypeModal;