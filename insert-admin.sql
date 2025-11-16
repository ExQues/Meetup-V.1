-- Inserir usuário admin diretamente no banco
INSERT INTO admin_users (email, password_hash, nome, role, is_active) 
VALUES (
    'admin@meetuptrae.com', 
    'RjdAdVA2cEhkOTNlTF5ReDJ1I0Q2dk0qOHJZK2tCMXdOJmg1c0MkSjBhVA==', -- Base64 da senha F7!tZp@93eL^Qx2u#D6vM*8rY%kB1wN&hG5sC$J0aT
    'Administrador', 
    'admin',
    true
) ON CONFLICT (email) DO UPDATE SET 
    password_hash = 'RjdAdVA2cEhkOTNlTF5ReDJ1I0Q2dk0qOHJZK2tCMXdOJmg1c0MkSjBhVA==',
    updated_at = NOW();