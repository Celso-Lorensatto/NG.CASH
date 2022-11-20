import { GetServerSideProps, GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import { destroyCookie, parseCookies } from "nookies";
import { AuthTokenError } from "./errors/AuthTokenError";


export function withSSRAuth<P>(fn: GetServerSideProps) {
    return async (ctx: GetServerSidePropsContext) => {

        const cookies = parseCookies(ctx)
        const token = cookies['NG.CASH.token']

        if (!token) {
            return {
                redirect: {
                    destination: '/login',
                    permanent: false
                }
            }
        }


        try {
            return await fn(ctx)
        } catch (err) {
            if (err instanceof AuthTokenError) {
                destroyCookie(ctx, 'NG.CASH.token')

                return {
                    redirect: {
                        destination: '/login',
                        permanent: false
                    }
                }
            }
        }
    }
}