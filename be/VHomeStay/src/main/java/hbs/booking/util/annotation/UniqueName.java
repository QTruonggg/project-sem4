package hbs.booking.util.annotation;

import hbs.booking.util.validation.UniqueNameUniqueValidator;
import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.*;

@Documented
@Constraint(validatedBy = UniqueNameUniqueValidator.class)
@Target( { ElementType.METHOD, ElementType.FIELD })
@Retention(RetentionPolicy.RUNTIME)
public @interface UniqueName {
    String message() default "Name already exists";
    Class<?>[] groups() default {};
    Class<? extends Payload>[] payload() default {};
}
