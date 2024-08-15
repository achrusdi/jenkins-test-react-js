import CustomersTable from "../components/tables/CustomersTable";

const CustomersPage = () => {
    return (
        <div className="container mx-auto">
            <h1 className="text-3xl font-bold">Customers Page</h1>
            <CustomersTable />
        </div>
    );
}
 
export default CustomersPage;