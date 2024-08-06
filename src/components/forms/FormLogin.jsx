import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, CardFooter, CardHeader, Divider, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import WithLoading from "../hoc/WithLoading";
import WithWindowSize from "../hoc/WithWindowSize";
import WithScrollPosition from "../hoc/WithScrollPosition";

const signUpFormSchema = z.object({
    email: z.string().email("Email Tidak Valid"),
    password: z.string().min(6),
});

const FormLogin = (props) => {
    const form = useForm({
        defaultValues: {
            email: "",
            password: "",
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
                    Signin Page
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

                        <Button type="submit">Submit</Button>
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