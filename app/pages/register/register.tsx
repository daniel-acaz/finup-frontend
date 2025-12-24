import { useEffect, useState } from "react"
import type { RegistrationFlow, UpdateRegistrationFlowBody } from "@ory/client"
import { useNavigate, useSearchParams } from "react-router"
import { ory } from "../../shared/ory"
import { Box, Button, FormControl, TextField } from "@mui/material";
import { findUiNodeInput, getNodeInputValue } from "~/shared/oryHelper";
import "./register.css"

export default function Register() {
    
    const [fullNameText, setFullNameText] = useState<string | null>(null);
    const [emailText, setEmailText] = useState<string | null>(null);
    const [passwordText, setPasswordText] = useState<string | null>(null);
    const [confirmPasswordText, setConfirmPasswordText] = useState<string | null>(null);

    const [flow, setFlow] = useState<RegistrationFlow | null>(null)
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()

    // 1. Inicializar ou Buscar o Fluxo
    useEffect(() => {
        async function initFlow() {
            const flowId = searchParams.get("flow")
            try {
                if (flowId) {
                // Se já temos um ID (ex: erro de validação retornou para cá)
                const { data } = await ory.getRegistrationFlow({ id: flowId })
                setFlow(data)
                } else {
                // Inicializa novo fluxo
                const { data } = await ory.createBrowserRegistrationFlow()
                setFlow(data)
                }
            } catch (err: any) {
                console.error(err)
            }
        }
        initFlow()
    }, [searchParams])

    // 2. Função de Submit
    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        if (!flow) return

        // Mapeia FormData para o objeto que o Kratos espera
        const body: UpdateRegistrationFlowBody = {
            method: "password",
            password: passwordText!,
            traits: {
                email: emailText!,
                name: fullNameText!, // Note: traits.name no schema
            },
            csrf_token: getNodeInputValue(flow.ui.nodes, "csrf_token")
        }

        try {
                await ory.updateRegistrationFlow({
                flow: flow.id,
                updateRegistrationFlowBody: body,
                })
                // Sucesso! O Kratos pode pedir verificação agora.
                // Geralmente redirecionamos para uma página avisando "Verifique seu email"
                navigate("/verification-sent") 
                
            } catch (err: any) {
                // Se der erro (ex: senha curta, email duplicado), o Kratos retorna o fluxo atualizado com mensagens de erro
                if (err.response?.status === 400) {
                setFlow(err.response.data)
                return
                }
                throw err
            }
    }

    if (!flow) return <div>Carregando...</div>

    // Helper para encontrar mensagens de erro por campo
    const getError = (name: string) => {
        const node = findUiNodeInput(flow.ui.nodes, name)
        return node?.messages.map(m => m.text).join(", ")
    }

    return  <div>
                <div className="logo">
                    <img src="/public/primary-logo.png" alt="Finup Logo"></img>
                </div>
                <Box
                className="register-inputs"
                    component="form"
                    onSubmit={handleSubmit}
                    noValidate
                >
                     <FormControl>
                        <TextField label="Full Name" variant="outlined" onChange={(e) => setFullNameText(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <TextField label="Email" variant="outlined" onChange={(e) => setEmailText(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <TextField label="Password" type="password" variant="outlined" onChange={(e) => setPasswordText(e.target.value)} />
                    </FormControl>
                    <FormControl>
                        <TextField label="Confirm Password" type="password" variant="outlined" onChange={(e) => setConfirmPasswordText(e.target.value)} />
                    </FormControl>
                    <FormControl className="register-button">
                        <Button variant="contained" type="submit">Sign In</Button>
                    </FormControl>
                </Box>
            </div>

}