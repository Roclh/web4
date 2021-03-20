package Rest;

import lombok.Data;

import javax.validation.constraints.DecimalMax;
import javax.validation.constraints.DecimalMin;
import javax.validation.constraints.NotNull;
import java.math.BigDecimal;

@Data
public class PointJSON {
    @NotNull(message = "X_MUST_NOT_BE_NULL_OR_EMPTY")
    private int x;
    @DecimalMax(value = "5", inclusive = false, message = "Y_VALUE_NOT_ALLOWED")
    @DecimalMin(value = "-5", inclusive = false, message = "Y_VALUE_NOT_ALLOWED")
    @NotNull(message = "Y_MUST_NOT_BE_NULL_OR_EMPTY")
    private BigDecimal y;
    @NotNull(message = "R_MUST_NOT_BE_NULL_OR_EMPTY")
    private int r;

    public int getX() {
        return this.x;
    }

    public BigDecimal getY() {
        return y;
    }

    public int getR() {
        return r;
    }
}
