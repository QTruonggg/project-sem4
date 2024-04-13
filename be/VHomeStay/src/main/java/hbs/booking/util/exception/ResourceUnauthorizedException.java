package hbs.booking.util.exception;

public class ResourceUnauthorizedException extends RuntimeException{
    public ResourceUnauthorizedException(String message) {
        super(message);
    }
}
