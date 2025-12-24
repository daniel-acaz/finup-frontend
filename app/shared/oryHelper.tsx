import type { UiNode, UiNodeInputAttributes } from "@ory/client"

/**
 * Busca o valor de um atributo input dentro dos nós do Kratos.
 */
export function getNodeInputAttribute(nodes: UiNode[], name: string): UiNodeInputAttributes | undefined {
  return nodes.find((node) => 
    node.attributes.node_type === "input" && 
    (node.attributes as UiNodeInputAttributes).name === name
  )?.attributes as UiNodeInputAttributes | undefined
}

/**
 * Atalho para pegar apenas o valor (value) direto.
 */
export function getNodeInputValue(nodes: UiNode[], name: string): string {
  const attribute = getNodeInputAttribute(nodes, name)
  return (attribute?.value as string) || ""
}

/**
 * Encontra um UiNode do tipo 'input' baseado no atributo 'name'.
 * Retorna o nó completo (útil para acessar mensagens de erro).
 */
export function findUiNodeInput(nodes: UiNode[], name: string): UiNode | undefined {
  return nodes.find((node) => 
    node.attributes.node_type === "input" && 
    (node.attributes as UiNodeInputAttributes).name === name
  )
}