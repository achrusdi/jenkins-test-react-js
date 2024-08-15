import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { connect, useSelector } from "react-redux";
import { uploadAvatar } from "../../actions/CustomersActions";

const UploadAvatarModal = ({ isOpen, onClose, customerId, uploadAvatar }) => {
    const { error, loading, success } = useSelector(state => state.customers);
    const [selectedAvatar, selectedAvatarSet] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        selectedAvatarSet(file);
    };

    const onSubmit = async (e) => {
        e.preventDefault();

        if (!selectedAvatar) {
            alert("Please select an image first!");
            return;
        }

        console.log(selectedAvatar);
        

        await uploadAvatar({
            customerId: customerId,
            avatar: selectedAvatar
        });

        if (success) {
            onClose();
        }
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
                        <ModalHeader className="flex flex-col gap-1">View Customer</ModalHeader>
                        <form onSubmit={onSubmit}>
                            <ModalBody>
                                {error && (
                                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-md" role="alert">
                                        <p className="font-bold">ERROR!!</p>
                                        <p>E-Mail or Password is wrong</p>
                                    </div>
                                )}
                                <div className="mb-3">
                                    <label
                                        htmlFor="formFile"
                                        className="mb-2 inline-block text-neutral-700 dark:text-neutral-200"
                                    >
                                        Upload Avatar
                                    </label>
                                    <input
                                        className="relative m-0 block w-full min-w-0 flex-auto rounded border border-solid border-neutral-300 bg-clip-padding px-3 py-[0.32rem] text-base font-normal text-neutral-700 transition duration-300 ease-in-out file:-mx-3 file:-my-[0.32rem] file:overflow-hidden file:rounded-none file:border-0 file:border-solid file:border-inherit file:bg-neutral-100 file:px-3 file:py-[0.32rem] file:text-neutral-700 file:transition file:duration-150 file:ease-in-out file:[border-inline-end-width:1px] file:[margin-inline-end:0.75rem] hover:file:bg-neutral-200 focus:border-primary focus:text-neutral-700 focus:shadow-te-primary focus:outline-none dark:border-neutral-600 dark:text-neutral-200 dark:file:bg-neutral-700 dark:file:text-neutral-100 dark:focus:border-primary"
                                        type="file"
                                        id="formFile"
                                        onChange={handleFileChange}
                                    />
                                </div>

                            </ModalBody>
                            <ModalFooter>
                                <Button color="danger" variant="light" onClick={onClose}>
                                    Close
                                </Button>
                                <Button color="primary" type="submit" disabled={loading}>
                                    {loading ? 'Updating...' : 'Upload'}
                                </Button>
                            </ModalFooter>
                        </form>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}

const mapDispatchToProps = { uploadAvatar };

export default connect(null, mapDispatchToProps)(UploadAvatarModal);