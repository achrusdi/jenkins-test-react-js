import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input, Link } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useNavigate } from "react-router-dom";
import { connect, useSelector } from "react-redux";
import { signin } from "../../actions/authActions";


const signInFormSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(3),
});

const FormLogin = ({ signin }) => {
    const navigate = useNavigate();
    const { token, error, loading } = useSelector((state) => state.auth);

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(signInFormSchema),
    });

    const onSubmit = async (data) => {
        console.log(token);

        try {
            await signin(data);

            if (token) {
                navigate('/home');
            }

        } catch (error) {
            console.error('There was an error!', error);
        } finally {
            console.log(error);
        }
    }

    return (
        <div className="min-w-[400px]">
            <Card>
                <CardHeader>
                    Sign In Page
                </CardHeader>
                <Divider />
                <CardBody>
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-md" role="alert">
                            <p className="font-bold">ERROR!!</p>
                            <p>E-Mail or Password is wrong</p>
                        </div>
                    )}
                    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <Controller
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        {...field}
                                        label="E - Mail"
                                        type="email"
                                        isInvalid={Boolean(fieldState.error)}
                                        errorMessage={fieldState.error?.message}
                                    />
                                );
                            }}
                        />

                        <Controller
                            control={form.control}
                            name="password"
                            render={({ field, fieldState }) => (
                                <Input
                                    {...field}
                                    label="Password"
                                    type="password"
                                    isInvalid={Boolean(fieldState.error)}
                                    errorMessage={fieldState.error?.message}
                                />
                            )}
                        />

                        <Button type="submit" disabled={loading}>{loading ? "Loading..." : "Sign In"}</Button>
                    </form>
                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
                </CardBody>
                <Divider />
                <CardFooter>
                    <p>Don't have an account? <Link href="/sign-up">Sign up</Link></p>
                </CardFooter>
            </Card>
        </div>
    );
}

const mapDispatchToProps = { signin };

export default connect(null, mapDispatchToProps)(FormLogin);