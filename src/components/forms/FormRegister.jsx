import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardFooter, CardHeader, Checkbox, CheckboxGroup, Divider, Input, Link } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { connect, useSelector } from "react-redux";
import { z } from "zod";
import { signup } from "../../actions/authActions";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const signUpFormSchema = z.object({
    email: z.string().min(3).email(),
    password: z.string().min(3),
    confirmPassword: z.string().min(3),
    roles: z.array(z.string()).min(1),
}).superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
        ctx.addIssue({
            code: "custom",
            message: "The passwords did not match",
            path: ['confirmPassword']
        });
    }
});

const FormRegister = ({ signup }) => {
    const { loading, error, success } = useSelector((state) => state.auth);
    const navigate = useNavigate();

    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
            roles: [],
        },
        resolver: zodResolver(signUpFormSchema),
    });

    const onSubmit = async (data) => {
        console.log(data);
        try {
            await signup(data);
        } catch (error) {
            console.error('There was an error!', error);
        }
    }

    useEffect(() => {
        if (success) {
            navigate('/sign-in');
        }
    }, [success, navigate]);

    return (
        <div className="min-w-[400px]">
            <Card>
                <CardHeader>
                    Sign Up Page
                </CardHeader>
                <Divider />
                <CardBody>
                    {error && (
                        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-8 rounded-md" role="alert">
                            <p className="font-bold">ERROR!!</p>
                            <p>Something went wrong</p>
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

                        <Controller
                            control={form.control}
                            name="confirmPassword"
                            render={({ field, fieldState }) => (
                                <Input
                                    {...field}
                                    label="Confirm Password"
                                    type="password"
                                    isInvalid={Boolean(fieldState.error)}
                                    errorMessage={fieldState.error?.message}
                                />
                            )}
                        />

                        <Controller
                            control={form.control}
                            name="roles"
                            render={({ field, fieldState }) => (
                                <CheckboxGroup
                                    label="Roles"
                                    color="primary"
                                    isInvalid={Boolean(fieldState.error)}
                                    errorMessage={fieldState.error?.message}
                                    {...field}
                                    orientation="horizontal"
                                >
                                    <Checkbox value='admin'>Admin</Checkbox>
                                    <Checkbox value='staff'>Staff</Checkbox>
                                    <Checkbox value='customer'>Customer</Checkbox>

                                </CheckboxGroup>
                            )}
                        />

                        <Button type="submit" disabled={loading}>{loading ? "Loading..." : "Sign Up"}</Button>
                    </form>
                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24"></svg>
                </CardBody>
                <Divider />
                <CardFooter>
                    <p>Already have an account? <Link href="/sign-in">Sign In</Link></p>
                </CardFooter>
            </Card>
        </div>
    );
}

const mapDispatchToProps = { signup };

export default connect(null, mapDispatchToProps)(FormRegister);
