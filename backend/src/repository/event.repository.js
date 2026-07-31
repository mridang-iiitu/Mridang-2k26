import { Event } from "../models/event.model.js";
import { ApiError } from "../utils/apiError.util.js";
import {
    uploadOnCloudinary,
    deleteFromCloudinary,
} from "../utils/cloudinary.util.js";

const validateTeamSize = (eventType, minTeamSize, maxTeamSize) => {
    if (eventType === "SOLO") {
        return { minTeamSize: 1, maxTeamSize: 1 };
    }

    if (!minTeamSize || !maxTeamSize) {
        throw new ApiError(400,"Team size is required");
    }

    if (minTeamSize < 2 || maxTeamSize < minTeamSize) {
        throw new ApiError(400,"Invalid team size");
    }

    return { minTeamSize, maxTeamSize };
};
const createEvent = async (data)=>{
    const {
        title, description, category,
        venue, eventType, registrationFee, registrationDeadline,
        startTime, endTime, status, rules, prizes, banner,minTeamSize, maxTeamSize
    } = data;
    const validated = validateTeamSize(eventType, minTeamSize, maxTeamSize);
    let bannerData = {
        url: "",
        publicId: "",
    };

    if (banner) {
        const uploadedFile = await uploadOnCloudinary(banner.path);

        if (uploadedFile) {
            bannerData = {
                url: uploadedFile.secure_url,
                publicId: uploadedFile.public_id,
            };
        }
    }
    const eventData = {
        title, description, category, venue,
        banner: bannerData, eventType, minTeamSize : validated.minTeamSize, maxTeamSize : validated.maxTeamSize, registrationFee,
        registrationDeadline, startTime, endTime, status, rules, prizes,
    };

    return Event.create(eventData);
}

const updateEvent = async (eventId, data) => {
    const event = await Event.findById(eventId).select(
        "eventType minTeamSize maxTeamSize banner"
    );

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    const eventType = data.eventType ?? event.eventType;
    const minTeamSize = data.minTeamSize ?? event.minTeamSize;
    const maxTeamSize = data.maxTeamSize ?? event.maxTeamSize;

    const validated = validateTeamSize(
        eventType,
        minTeamSize,
        maxTeamSize
    );

    if (data.banner) {
        const uploadedFile = await uploadOnCloudinary(data.banner.path);

        if (uploadedFile) {
            data.banner = {
                url: uploadedFile.secure_url,
                publicId: uploadedFile.public_id,
            };
        } else {
            throw new ApiError(500, "Failed to upload banner");
        }
    } else {
        delete data.banner;
    }

    const updateData = {
        ...data,
        minTeamSize: validated.minTeamSize,
        maxTeamSize: validated.maxTeamSize,
    };

    const updatedEvent = await Event.findByIdAndUpdate(
        eventId,
        updateData,
        {
            new: true,
            runValidators: true,
        }
    );

    if (data.banner && event.banner?.publicId) {
        await deleteFromCloudinary(event.banner.publicId);
    }

    return updatedEvent;
};
const deleteEvent = async (eventId) => {
    const event = await Event.findByIdAndDelete(eventId);

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    if (event.banner?.publicId) {
        await deleteFromCloudinary(event.banner.publicId);
    }

    return event;
};
const getEventById = async (eventId) => {
    const event = await Event.findById(eventId).lean();

    if (!event) {
        throw new ApiError(404, "Event not found");
    }

    return event;
};
const getAllEvents = async (search = "") => {
    const query = {};
    if (search?.trim()) {
        query.title = {
            $regex: search,
            $options: "i",
        };
    }
    return Event.find(query).select("title banner venue startTime endTime category registrationFee status")
    .sort({
        startTime: 1,
    })
    .lean();
};
export {
    createEvent,
    updateEvent,
    deleteEvent,
    getEventById,
    getAllEvents,
};