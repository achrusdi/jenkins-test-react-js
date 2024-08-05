import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardHeader, Divider, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const signUpFormSchema = z.object({
    email: z.string().email("Email Tidak Valid"),
    username: z.string().min(3),
    password: z.string().min(6),
    repeatPassword: z.string().min(6),
}).superRefine(({ password, repeatPassword }, ctx) => {
    if (password !== repeatPassword) {
        ctx.addIssue({
            code: "400",
            message: "Passwords do not match",
            path: ["repeatPassword"],
        });
    }
});

const TestForm1 = () => {
    const form = useForm({
        defaultValues: {
            email: "",
            username: "",
            password: "",
            repeatPassword: "",
        },
        resolver: zodResolver(signUpFormSchema),
    });

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className="flex h-screen items-center justify-center w-[300px]">
            <Card>
                <CardHeader>
                    Signup Page
                </CardHeader>
                <Divider />
                <CardBody>
                    <form className="flex flex-col gap-4" onSubmit={form.handleSubmit(onSubmit)}>
                        <Controller
                            control={form.control}
                            name="email"
                            render={({ field, fieldState }) => {
                                return (
                                    <Input
                                        {...field}
                                        label="Email"
                                        type="email"
                                        isInvalid={Boolean(fieldState.error)}
                                        errorMessage={fieldState.error?.message}
                                    />
                                );
                            }}
                        />

                        <Controller
                            control={form.control}
                            name="username"
                            render={({ field, fieldState }) => (
                                <Input
                                    {...field}
                                    label="Username"
                                    type="text"
                                    isInvalid={Boolean(fieldState.error)}
                                    errorMessage={fieldState.error?.message}
                                />
                            )}
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
                            name="repeatPassword"
                            render={({ field, fieldState }) => (
                                <Input
                                    {...field}
                                    label="Repeat Password"
                                    type="password"
                                    isInvalid={Boolean(fieldState.error)}
                                    errorMessage={fieldState.error?.message}
                                />
                            )}
                        />

                        <Button type="submit">Submit</Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    );
}

export default TestForm1;