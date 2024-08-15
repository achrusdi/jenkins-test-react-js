import { zodResolver } from "@hookform/resolvers/zod";
import { Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Radio, RadioGroup } from "@nextui-org/react";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { getCustomers, updateCustomer } from "../../actions/CustomersActions";
import { connect, useSelector } from "react-redux";

const customerFormSchema = z.object({
    firstName: z.string().min(3),
    lastName: z.string().min(3),
    phone: z.string().min(3),
    status: z.string(),
    dateOfBirth: z.string().min(3),
});

const CustomersModal = ({ isOpen, onClose, customer, isEditable, updateCustomer, getCustomers }) => {

    const initialValue = {
        id: customer?.id || '',
        firstName: customer?.firstName || '',
        lastName: customer?.lastName || '',
        phone: customer?.phone || '',
        status: customer?.status || 1,
        dateOfBirth: customer?.dateOfBirth ? new Date(customer?.dateOfBirth).toLocaleDateString() : '',
    }

    const { loading, error, success } = useSelector((state) => state.customers);

    const form = useForm({
        defaultValues: initialValue,
        resolver: zodResolver(customerFormSchema),
    });

    const getFormatedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`
    }

    const onSubmit = async (data) => {
        data.status = Number(data.status);
        data.id = customer?.id || '';
        data.dateOfBirth = getFormatedDate(new Date(data.dateOfBirth));

        console.log(data);

        await updateCustomer(data);

        if (success) {
            fetchCustomers();
            onClose();
        }
    }

    const fetchCustomers = async () => {
        await getCustomers();
    }

    useEffect(() => {
        form.reset(initialValue);
    }, [customer])

    return (
        <Modal
            size='lg'
            isOpen={isOpen}
            onClose={onClose}
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">View Customer</ModalHeader>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <ModalBody>
                                {error && (
                                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-md" role="alert">
                                        <p className="font-bold">ERROR!!</p>
                                        <p>E-Mail or Password is wrong</p>
                                    </div>
                                )}
                                <Controller
                                    control={form.control}
                                    name="firstName"
                                    render={({ field, fieldState }) => (
                                        <Input
                                            {...field}
                                            label="First Name"
                                            isDisabled={!isEditable}
                                            isInvalid={fieldState.error}
                                            errorMessage={fieldState.error?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="lastName"
                                    render={({ field, fieldState }) => (
                                        <Input
                                            {...field}
                                            label="Last Name"
                                            isDisabled={!isEditable}
                                            isInvalid={fieldState.error}
                                            errorMessage={fieldState.error?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="phone"
                                    render={({ field, fieldState }) => (
                                        <Input
                                            {...field}
                                            label="Phone"
                                            isDisabled={!isEditable}
                                            isInvalid={fieldState.error}
                                            errorMessage={fieldState.error?.message}
                                        />
                                    )}
                                />

                                <Controller
                                    control={form.control}
                                    name="status"
                                    render={({ field, fieldState }) => {
                                        // console.log({ ...field });
                                        return (
                                            <RadioGroup
                                                {...field}
                                                label="Is Active"
                                                orientation="horizontal"
                                                isDisabled={!isEditable}
                                                isInvalid={fieldState.error}
                                                errorMessage={fieldState.error?.message}
                                            >
                                                <Radio value={1}>Active</Radio>
                                                <Radio value={0}>Inactive</Radio>
                                            </RadioGroup>
                                        )
                                    }}
                                />

                                <Controller
                                    control={form.control}
                                    name="dateOfBirth"
                                    render={({ field, fieldState }) => (
                                        <Input
                                            {...field}
                                            label="Date of Birth"
                                            isDisabled={!isEditable}
                                            isInvalid={fieldState.error}
                                            errorMessage={fieldState.error?.message}
                                        />
                                        // <DatePicker
                                        //     {...field}
                                        //     label="Birth date"
                                        //     // defaultValue={}
                                        // />
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

const mapDispatchToProps = { updateCustomer, getCustomers };

export default connect(null, mapDispatchToProps)(CustomersModal);