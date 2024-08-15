import { connect, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Button, ButtonGroup, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow, useDisclosure } from "@nextui-org/react";
import InstalmentTypeModal from "../modals/InstalmentTypeModal";
import { deleteInstalmentType, fetchInstalmentTypes } from "../../services/InstalmentTypeService";

const InstalmentTypeTable = () => {
    const { onOpen, onClose, isOpen } = useDisclosure();
    const [selectefInstalmentType, selectefInstalmentTypeSet] = useState(null);
    const [isEditable, isEditableSet] = useState(false);
    const [loading, loadingSet] = useState(false);
    const instalmentTypesHeader = [
        { name: "#", uid: "no" },
        { name: "INSTALMENT TYPE", uid: "instalmentType" },
        { name: "ACTIONS", uid: "actions" },
    ];
    const [instalmentTypes, instalmentTypesSet] = useState([]);

    const fetchData = async () => {
        loadingSet(true);
        const response = await fetchInstalmentTypes();        
        instalmentTypesSet(response.data);
        loadingSet(false);
    }

    useEffect(() => {
        fetchData();
    }, [])

    const openModalView = async (instalmentType) => {
        selectefInstalmentTypeSet(instalmentType);
        isEditableSet(false);
        onOpen();
    }

    const openModalEdit = async (instalmentType) => {
        selectefInstalmentTypeSet(instalmentType);
        isEditableSet(true);
        onOpen();
    }

    const handleDelete = async (id) => {
        try {
            await deleteInstalmentType(id);
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
                            {instalmentTypesHeader.map((header) => (
                                <TableColumn key={header.uid}>{header.name}</TableColumn>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {instalmentTypes.map((instalmentType, index) => {
                                return (
                                    <TableRow key={instalmentType.id}>
                                        <TableCell>{index + 1}</TableCell>
                                        <TableCell>{instalmentType.instalmentType}</TableCell>
                                        <TableCell>
                                            <ButtonGroup>
                                                <Button className="bg-blue-500" onClick={() => openModalView(instalmentType)}>View</Button>
                                                <Button className="bg-yellow-500" onClick={() => openModalEdit(instalmentType)}>Edit</Button>
                                                <Button className="bg-red-500" onPress={() => handleDelete(instalmentType.id)}>Delete</Button>
                                            </ButtonGroup>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                    <InstalmentTypeModal isOpen={isOpen} onClose={onClose} instalmentType={selectefInstalmentType} isEditable={isEditable} />
                </>
            )}
        </div>
    );
}

export default InstalmentTypeTable;