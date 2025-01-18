function phoneMask(value: string) {
  let v = value?.toString();
  v = v?.replace(/\D/g, "");

  if (v?.length === 11) {
    // Celular
    v = v?.replace(/^(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (v?.length === 10) {
    // Telefone fixo
    v = v?.replace(/^(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
  } else {
    return value;
  }

  return v;
}

export { phoneMask };
