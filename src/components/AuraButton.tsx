import { forwardRef } from "react";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

const AuraButton = forwardRef(function AuraButton({ children, ...props }, ref) {
    return (
        <Button ref={ref} variant="secondary" onClick={() => signIn('spotify', {callbackUrl: "/aura"})} className="mt-4" {...props}>
            {children}
        </Button>
    );
});

export default AuraButton;
