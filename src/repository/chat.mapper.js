import Chat from "../model/chat.model.js"

class ChatMapper {
    static mapMessageFromSqlResult(result, user_id) {
        return new Chat(
            undefined,
            result.content, 
            result.created_at, 
            result.issurer_id === user_id,
            undefined
        )
    }

    static mapChatFromSqlResult(result, user_id) {
        const isIssurer = result.i_id === user_id
        return new Chat(
            !isIssurer ? result.r_username : result.i_username,
            result.content, 
            result.created_at, 
            isIssurer,
            !isIssurer ? result.r_id : result.i_id
        )
    }
}

export default ChatMapper