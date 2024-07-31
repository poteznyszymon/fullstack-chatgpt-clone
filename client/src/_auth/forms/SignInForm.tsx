import { Link, useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { FaLock } from "react-icons/fa";
import { FaUnlock } from "react-icons/fa";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { Input } from "../../components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState } from "react";
import { loginUser } from "../../firebase/firebase";
import { toast } from "../../components/ui/use-toast";

const formSchema = z.object({
  email: z.string().email(),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters" }),
});

const SignInForm = () => {
  const [hidePassword, setHidePassword] = useState(true);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    try {
      await loginUser(values.email, values.password);
      toast({ title: "User logged successfully" });
      setIsLoading(false);
      navigate("/home");
    } catch (error) {
      toast({
        title: "Something went wrong, try again",
        variant: "destructive",
      });
      setIsLoading(false);
    }
  }
  return (
    <div className="bg-black h-screen flex flex-col justify-center items-center">
      <Form {...form}>
        <div className="flex flex-col gap-5 w-[80%] items-center">
          <section className="flex items-center flex-col">
            <h2 className="text-3xl font-bold leading-[140%] tracking-tighter lg:text-4xl ">
              Login to your account
            </h2>
            <p className="text-gray-500 text-sm">
              To use ChatAI please enter your details
            </p>
          </section>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-5 w-[100%]"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Email<span className="text-red-600 pl-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      className="h-10 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3"
                    />
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Password<span className="text-red-600 pl-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={hidePassword ? "password" : "text"}
                        {...field}
                        className="h-10 bg-dark-4 border-none placeholder:text-light-4 focus-visible:ring-1 focus-visible:ring-offset-1 ring-offset-light-3 "
                      />
                      {hidePassword ? (
                        <FaLock
                          size={13}
                          className="absolute top-[50%] translate-x-[-50%] right-1 translate-y-[-50%] cursor-pointer text-main-purple"
                          onClick={() => {
                            setHidePassword(!hidePassword);
                          }}
                        />
                      ) : (
                        <FaUnlock
                          size={13}
                          className="absolute top-[50%] translate-x-[-50%] right-1 translate-y-[-50%] cursor-pointer text-main-purple"
                          onClick={() => {
                            setHidePassword(!hidePassword);
                          }}
                        />
                      )}
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs text-red-600" />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full bg-purple-500 hover:bg-purple-500/80 h-10 text-white"
            >
              Login
              {isLoading && (
                <img src="/loading-icon-white.svg" className="w-5 h-5 ml-1" />
              )}
            </Button>
            <p className="text-xs text-gray-400 text-center mt-2">
              Don't have an account?
              <Link
                to="/sign-up"
                className="text-purple-500 text-small-semibold ml-1 "
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default SignInForm;
