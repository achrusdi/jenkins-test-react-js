import { Button, ButtonGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { getLoanTypes } from "../../services/LoanTypeService";
import LoanTypeModal from "../modals/LoanTypeModal";

const LoanTypeTable = () => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [selectefLoanType, selectefLoanTypeSet] = useState(null);
    const [isEditable, isEditableSet] = useState(false);
    const [loading, loadingSet] = useState(false);
    const loanTypesHeader = [
        { name: "#", uid: "no" },
        { name: "TYPE", uid: "type" },
        { name: "MAX LOAN", uid: "maxLoan" },
        { name: "ACTIONS", uid: "actions" },
    ];
    const [LoanTypes, LoanTypesSet] = useState([]);

    const fetchData = async () => {
        loadingSet(true);
        const response = await getLoanTypes();
        LoanTypesSet(response.data);
        loadingSet(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const openModalView = async (instalmentType) => {
        selectefLoanTypeSet(instalmentType);
        isEditableSet(false);
        onOpen();
    }

    const openModalEdit = async (instalmentType) => {
        selectefLoanTypeSet(instalmentType);
        isEditableSet(true);
        onOpen();
    }

    const handleDelete = async (id) => {
        try {
            // await deleteInstalmentType(id);
            fetchData();
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="mt-4">
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <Table aria-label="Example static collection table">
                        <TableHeader>
                            {loanTypesHeader.map((header) => (
                                <TableColumn key={header.uid}>{header.name}</TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {LoanTypes.map((loanType, index) => {
                                return (
                                    <TableRow key={loanType.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{loanType.type}</TableCell>
                                        <TableCell>{loanType.maxLoan}</TableCell>
                                        <TableCell>
                                            <ButtonGroup>
                                                <Button className="bg-blue-500" onClick={() => openModalView(loanType)}>View</Button>
                                                <Button className="bg-yellow-500" onClick={() => openModalEdit(loanType)}>Edit</Button>
                                                <Button className="bg-red-500" onPress={() => handleDelete(loanType.id)}>Delete</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <LoanTypeModal isEditable={isEditable} isOpen={isOpen} onClose={onClose} loanType={selectefLoanType} />
                </>
            )}
        </div>
    );
}

export default LoanTypeTable;