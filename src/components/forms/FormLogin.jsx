import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import WithScrollPosition from "../../hoc/WithScrollPosition";
import WithWindowSize from "../../hoc/WithWindowSize";
import WithLoading from "../../hoc/WithLoading";
import { useAuth } from "../../contexts/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const signUpFormSchema = z.object({
    email: z.string().min(3),
    password: z.string().min(3),
});

const FormLogin = (props) => {
    const navigate = useNavigate();
    const { login, error, user, loading } = useAuth();
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
        resolver: zodResolver(signUpFormSchema),
    });

    const onSubmit = async (data) => {
        
        await login(data.email, data.password);

    }

    useEffect(() => {
        if (user) {
            navigate("/home");
        }
    }, [user]);

    return (
        <div className="flex h-screen items-center justify-center w-[300px]">
            <Card>
                <CardHeader>
                    Signin Page
                </CardHeader>
                <Divider />
                <CardBody>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <Controller
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        {...field}
                                        label="Username"
                                        type="text"
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

                        <Button type="submit" disabled={loading}>{loading ? "Loading..." : "Submit"}</Button>
                    </form>
                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
                </CardBody>
                <Divider />
                <CardFooter>
                    <p>
                        Windows size: {props.windowSize.width} x {props.windowSize.height}
                    </p>
                    <p>
                        Scroll position: {props.scrollPosition}
                    </p>
                </CardFooter>
            </Card>
        </div>
    );
}

export default WithScrollPosition(WithWindowSize(WithLoading(FormLogin)));