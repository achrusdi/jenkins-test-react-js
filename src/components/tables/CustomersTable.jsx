import { Button, ButtonGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, Tooltip, useDisclosure, User } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { deleteCustomer, getCustomers } from "../../actions/CustomersActions";
import { connect, useSelector } from "react-redux";
import CustomersModal from "../modals/CustomersModal";
import UploadAvatarModal from "../modals/UploadAvatarModal";

const CustomersTable = ({ getCustomers, deleteCustomer }) => {
    const { customers, loading, customersHeader } = useSelector((state) => state.customers);
    const [selectedCustomer, selectedCustomerSet] = useState({});
    const [isEditable, isEditableSet] = useState(false);
    const modalEdit = useDisclosure();
    const modalUploadAvatar = useDisclosure();

    useEffect(() => {
        fetchCustomers();
    }, [])

    const fetchCustomers = async () => {
        await getCustomers();
    }

    const openModalView = (customer) => {
        isEditableSet(false);
        selectedCustomerSet(customer);
        modalEdit.onOpen();
    }

    const openModalEdit = (customer) => {
        isEditableSet(true);
        selectedCustomerSet(customer);
        modalEdit.onOpen();
    }

    const openModalUploadAvatar = (customer) => {
        selectedCustomerSet(customer);
        modalUploadAvatar.onOpen();
    }

    const handleDelete = async (id) => {
        await deleteCustomer(id);
        fetchCustomers();
    }

    return (
        <div className="mt-4">
            {loading ? (<div>Loading...</div>) : (
                <>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            {customersHeader.map((header) => (
                                <TableColumn key={header.uid}>{header.name}</TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {customers.map((customer, index) => {
                                return (
                                    <TableRow key={customer.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{customer.firstName}</TableCell>
                                        <TableCell>{customer.lastName}</TableCell>
                                        <TableCell>{customer.phone}</TableCell>
                                        <TableCell>{customer.status ? 'Active' : 'Inactive'}</TableCell>
                                        <TableCell>{customer.dateOfBirth && new Date(customer.dateOfBirth).toLocaleDateString()}</TableCell>
                                        <TableCell>
                                            <ButtonGroup>
                                                <Button className="bg-blue-500" onClick={() => openModalView(customer)}>View</Button>
                                                <Button className="bg-yellow-500" onClick={() => openModalEdit(customer)}>Edit</Button>
                                                <Button className="bg-green-500" onClick={() => openModalUploadAvatar(customer)}>Upload Avatar</Button>
                                                <Button className="bg-red-500" onPress={() => handleDelete(customer.id)}>Delete</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <CustomersModal isOpen={modalEdit.isOpen} onClose={modalEdit.onClose} customer={selectedCustomer} isEditable={isEditable} />
                    <UploadAvatarModal isOpen={modalUploadAvatar.isOpen} onClose={modalUploadAvatar.onClose} customerId={selectedCustomer.id} />
                </>
            )}
        </div>
    );
}

const mapDispatchToProps = { getCustomers, deleteCustomer };

export default connect(null, mapDispatchToProps)(CustomersTable);