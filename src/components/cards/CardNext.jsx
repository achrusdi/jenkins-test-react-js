import { Card, CardHeader, CardBody, CardFooter, Image, Divider, Link, Button } from "@nextui-org/react";

const CardNext = ({imgUrl, title, content}) => {
    return (
        <Card className="max-w-[400px]">
            <CardHeader className="flex gap-3">
                <Image
                    alt="nextui logo"
                    height={40}
                    radius="sm"
                    // src="https://avatars.githubusercontent.com/u/86160567?s=200&v=4"
                    src={imgUrl}
                    width={40}
                />
                <div className="flex flex-col">
                    <p className="text-md">{title}</p>
                    {/* <p className="text-small text-default-500">nextui.org</p> */}
                </div>
            </CardHeader>
            <Divider />
            <CardBody>
                <p>{content}</p>
                <Button color="primary">
                    Button
                </Button>
            </CardBody>
            <Divider />
            <CardFooter>
                <Link
                    isExternal
                    showAnchorIcon
                    href="https://github.com/nextui-org/nextui"
                >
                    Visit source code on GitHub.
                </Link>
            </CardFooter>
        </Card>
    );
}

export default CardNext;