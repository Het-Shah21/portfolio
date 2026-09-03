from fastapi import APIRouter, HTTPException
from schemas.contact import ContactRequest, ContactResponse
from arq import create_pool
from arq.connections import RedisSettings

router = APIRouter()

@router.post("/contact", response_model=ContactResponse)
async def submit_contact_form(request: ContactRequest):
    try:
        # Enqueue the task
        redis = await create_pool(RedisSettings(host='localhost', port=6379))
        await redis.enqueue_job(
            'send_contact_email', 
            request.name, 
            request.email, 
            request.message
        )
        return ContactResponse(status="success", message="Your message has been queued for delivery.")
    except Exception as e:
        print(f"Error enqueueing task: {e}")
        raise HTTPException(status_code=500, detail="Failed to enqueue message")
