class User {
    constructor(
        id, 
        username, 
        email, 
        password, 
        active, 
        verify_email, 
        created_at,
        thumbnail, 
        telephone,
        public_state,
        description_content,
        address_content
    ) {
        this.id = id
        this.username = username
        this.email = email
        this.password = password
        this.active = active 
        this.verify_email = verify_email
        this.created_at = created_at 
        this.thumbnail = thumbnail
        this.telephone = telephone
        this.public_state = public_state
        this.description_content = description_content
        this.address_content = address_content
    }

    static createUserRegister(username, email, password, active, verify_email) {
        return new User(null, username, email, password, active, verify_email, null, null, null, null, null, null)
    }
    
    static createUserPublic(user) {
        return {
            id: user.id,
            username: user.username,
            email: user.email,
            thumbnail: user.thumbnail,
            telephone: user.telephone,
            public_state: user.public_state,
            description_content: user.description_content,
            address_content: user.address_content
        }
    }
}

export default User