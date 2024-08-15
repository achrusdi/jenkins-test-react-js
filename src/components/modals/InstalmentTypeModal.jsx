import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { updateInstalmentType } from "../../services/InstalmentTypeService";

const instalmentTypeFormSchema = z.object({
    instalmentType: z.string().min(3),
});

const InstalmentTypeModal = ({ isOpen, onClose, isEditable, instalmentType }) => {
    const [error, errorSet] = useState(null);
    const [loading, loadingSet] = useState(false);

    const initialValue = {
        instalmentType: instalmentType?.instalmentType || '',
    }

    const form = useForm({
        defaultValues: initialValue,
        resolver: zodResolver(instalmentTypeFormSchema),
    });
    
    useEffect(() => {
        form.reset(initialValue);
    }, [instalmentType]);

    const onSubmit = async (data) => {
        loadingSet(true);
        data.id = instalmentType.id;
        try {
            const response = await updateInstalmentType(data);

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
                        <ModalHeader className="flex flex-col gap-1">View Instalment Type</ModalHeader>
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
                                    name="instalmentType"
                                    render={({ field, fieldState }) => (
                                        <Input
                                            {...field}
                                            label="Instalment Type"
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

export default InstalmentTypeModal;