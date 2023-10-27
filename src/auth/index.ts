const isForbidden = (context: any) => {
    return true;
}

export const getUserAuthState = (authToken: String) : any  => ({
    authToken: authToken
})

export const isAuthorizedToFeed = (context: any, feedId: String) => {
    return true;
}