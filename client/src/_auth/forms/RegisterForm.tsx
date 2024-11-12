import { Link } from "react-router-dom";
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
import { useState } from "react";
import { FaLock, FaUnlock } from "react-icons/fa";
import { registerSchema, registerValues } from "@/lib/validation";
import LoadingButton from "@/components/shared/LoadingButton";

const RegisterForm = () => {
  const [hidePassword, setHidePassword] = useState(true);

  const form = useForm<registerValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      displayName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: registerValues) => {
    console.log(values);
  };

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <Form {...form}>
        <div className="flex flex-col gap-5 w-[80%] items-center">
          <section className="flex items-center flex-col">
            <h2 className="text-3xl font-bold leading-[140%] tracking-tighter lg:text-4xl ">
              Create a new account
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
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-white">
                    Username<span className="text-red-600 pl-1">*</span>
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
                  <FormLabel htmlFor="password" className="text-white">
                    Password<span className="text-red-600 pl-1">*</span>
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="password"
                        {...field}
                        type={hidePassword ? "password" : "text"}
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
            <LoadingButton
              loading={false}
              className="w-full bg-purple-500 hover:bg-purple-500/80 h-10 text-white"
            >
              Register
            </LoadingButton>
            <p className="text-xs text-gray-400 text-center mt-2">
              Already have an account?
              <Link
                to="/login"
                className="text-purple-500 text-small-semibold ml-1 hover:underline cursor-not-allowed"
              >
                Log in
              </Link>
            </p>
          </form>
        </div>
      </Form>
    </div>
  );
};

export default RegisterForm;
