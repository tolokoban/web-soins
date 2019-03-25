export default { get };

enum EnumWebServiceError {
    OK = 0,
    BAD_ROLE,
    BAD_TYPE,
    CONNECTION_FAILURE,
    MISSING_AUTOLOGIN,
    UNKNOWN_USER,
    HTTP_ERROR
}

interface ICallResponse {
    code: EnumWebServiceError;
    data: any;
}

async function get(name: string, args: {}): Promise<any> {
    const response: ICallResponse = await callService(name, args);
    if (response.code === EnumWebServiceError.OK) {
        const obj = JSON.parse(response.data);
        return obj;
    } else {
        throw response;
    }
}

async function callService(name: string, args: {}): Promise<ICallResponse> {
    const data = new FormData();
    data.append("s", name);
    data.append("i", JSON.stringify(args));
    const
        url = `tfw/svc.php`,
        init = { method: "POST", body: data },
        response = await fetch(url, init);
    if (response.ok) {
        return {
            code: EnumWebServiceError.OK,
            data: await response.text()
        }
    }
    return {
        code: EnumWebServiceError.HTTP_ERROR,
        data: response.statusText
    }
}
