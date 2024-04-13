//package hbs.booking.service.impl;
//
//import hbs.booking.model.dto.response.room.RoomSearchManagerResponseDto;
//import hbs.booking.repository.RoomRepository;
//import hbs.booking.util.exception.ResourceNotFoundException;
//import org.junit.jupiter.api.AfterEach;
//import org.junit.jupiter.api.BeforeEach;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.MockitoJUnitRunner;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.context.MessageSource;
//import org.springframework.security.test.context.support.WithMockUser;
//import org.mockito.ArgumentMatchers;
//
//import java.math.BigDecimal;
//import java.util.*;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@RunWith(MockitoJUnitRunner.class)
//@SpringBootTest
//class RoomServiceImplTest {
//    @Mock
//    private RoomRepository roomRepository;
//
//    @InjectMocks
//    private RoomServiceImpl roomService;
//
//    @Mock
//    private MessageSource messageSource;
//
//    @BeforeEach
//    void setUp() {
//    }
//
//    @AfterEach
//    void tearDown() {
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager1() {
//        // checkInDate is null
//        String homestayId = "1";
//        String checkInDate = null;
//        String checkOutDate = "2021-12-12";
//
//        Mockito.when(messageSource.getMessage("date.invalid", null, Locale.getDefault())).thenReturn("Check in date or check out date is invalid");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager2() {
//        //checkInDate is empty
//        String homestayId = "1";
//        String checkInDate = "";
//        String checkOutDate = "2021-12-12";
//
//        Mockito.when(messageSource.getMessage("date.invalid", null, Locale.getDefault())).thenReturn("Check in date or check out date is invalid");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager3() {
//        //checkOutDate is null
//        String homestayId = "1";
//        String checkInDate = "2021-12-12";
//        String checkOutDate = null;
//
//        Mockito.when(messageSource.getMessage("date.invalid", null, Locale.getDefault())).thenReturn("Check in date or check out date is invalid");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager4() {
//        //checkOutDate is empty
//        String homestayId = "1";
//        String checkInDate = "2021-12-12";
//        String checkOutDate = "";
//
//        Mockito.when(messageSource.getMessage("date.invalid", null, Locale.getDefault())).thenReturn("Check in date or check out date is invalid");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager5() {
//        //checkInDate and checkOutDate is null
//        String homestayId = "1";
//        String checkInDate = null;
//        String checkOutDate = null;
//
//        Mockito.when(messageSource.getMessage("date.invalid", null, Locale.getDefault())).thenReturn("Check in date or check out date is invalid");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager6() {
//        //checkInDate and checkOutDate is empty
//        String homestayId = "1";
//        String checkInDate = "";
//        String checkOutDate = "";
//
//        Mockito.when(messageSource.getMessage("date.invalid", null, Locale.getDefault())).thenReturn("Check in date or check out date is invalid");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager7() {
//        //checkInDate and checkOutDate is invalid
//        String homestayId = "1";
//        String checkInDate = "2021-12-12";
//        String checkOutDate = "2021-12-11";
//
//        Mockito.when(messageSource.getMessage("date.invalid", null, Locale.getDefault())).thenReturn("Check in date or check out date is invalid");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager8() {
//        String homestayId = "1";
//        String checkInDate = "2021-12-12";
//        String checkOutDate = "2021-12-12";
//
//        Mockito.when(messageSource.getMessage("date.invalid", null, Locale.getDefault())).thenReturn("Check in date or check out date is invalid");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager9() {
//        String homestayId = "10";
//        String checkInDate = "2021-12-12";
//        String checkOutDate = "2021-12-13";
//
//        Mockito.when(messageSource.getMessage("homestay.not.found", null, Locale.getDefault())).thenReturn("Homestay not found");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager10() {
//        String homestayId = "1";
//        String checkInDate = "2023-12-12";
//        String checkOutDate = "2023-12-13";
//
//        List<Object[]> objects = new ArrayList<>();
//
//        Object[] obj1 = {1L, "Amazing Meo Vac", 1L, "Phong 2 nguoi", 0, 1L, "Phong 1", 2, 2, 0, 2500.0, "0"};
//        Object[] obj2 = {1L, "Amazing Meo Vac", 2L, "Phong 3 nguoi", 0, 2L, "Phong 2", 3, 1, 1, 2800.0, "0"};
//        Object[] obj3 = {1L, "Amazing Meo Vac", 3L, "Dorm", 5, 3L, "Phong D1", 1, 1, 0, 180.0, "1"};
//        Object[] obj4 = {2L, "Amazing Meo Meo", 1L, "Phong 2 nguoi", 0, 2L, "Phong 2", 2, 2, 0, 2500.0, "0"};
//        Object[] obj5 = {2L, "Amazing Meo Meo", 2L, "Phong 3 nguoi", 0, 2L, "Phong 2", 2, 2, 0, 2500.0, "0"};
//        Object[] obj6 = {2L, "Amazing Meo Meo", 3L, "Dorm", 0, 2L, "Phong 2", 2, 2, 0, 2500.0, "0"};
//
//        Collections.addAll(objects, obj1, obj2, obj3, obj4, obj5, obj6);
//
//        Mockito.when(roomRepository.searchAvailableRoomsWithTotalDormSlotByManager(Mockito.eq("user"), Mockito.any(), Mockito.any(), Mockito.any())).thenReturn(objects);
//
//        List<RoomSearchManagerResponseDto> result = roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//
//        assertNotNull(result);
//        assertEquals(6, result.size());
//        RoomSearchManagerResponseDto dto = result.get(0);
//        assertEquals(1L, dto.getHomestayId());
//        assertEquals("Amazing Meo Vac", dto.getHomestayName());
//        assertEquals(1L, dto.getHouseholdRoomTypeId());
//        assertEquals("Phong 2 nguoi", dto.getHouseholdRoomTypeName());
//        assertEquals(0, dto.getTotalSlotDefault());
//        assertEquals(1L, dto.getRoomId());
//        assertEquals("Phong 1", dto.getRoomName());
//        assertEquals(2, dto.getCapacity());
//        assertEquals(2, dto.getSingleBed());
//        assertEquals(0, dto.getDoubleBed());
//        assertEquals(BigDecimal.valueOf(2500.0), dto.getPrice());
//        assertEquals(false, dto.getIsDorm());
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager11() {
//        String homestayId = null;
//        String checkInDate = "2023-12-12";
//        String checkOutDate = "2023-12-13";
//
//        List<Object[]> objects = new ArrayList<>();
//
//        Object[] obj1 = {1L, "Amazing Meo Vac", 1L, "Phong 2 nguoi", 0, 1L, "Phong 1", 2, 2, 0, 2500.0, "0"};
//        Object[] obj2 = {1L, "Amazing Meo Vac", 2L, "Phong 3 nguoi", 0, 2L, "Phong 2", 3, 1, 1, 2800.0, "0"};
//        Object[] obj3 = {1L, "Amazing Meo Vac", 3L, "Dorm", 5, 3L, "Phong D1", 1, 1, 0, 180.0, "1"};
//        Object[] obj4 = {2L, "Amazing Meo Meo", 1L, "Phong 2 nguoi", 0, 2L, "Phong 2", 2, 2, 0, 2500.0, "0"};
//        Object[] obj5 = {2L, "Amazing Meo Meo", 2L, "Phong 3 nguoi", 0, 2L, "Phong 2", 2, 2, 0, 2500.0, "0"};
//        Object[] obj6 = {2L, "Amazing Meo Meo", 3L, "Dorm", 0, 2L, "Phong 2", 2, 2, 0, 2500.0, "0"};
//
//        Collections.addAll(objects, obj1, obj2, obj3, obj4, obj5, obj6);
//
//        Mockito.when(roomRepository.searchAvailableRoomsWithTotalDormSlotByManager(Mockito.eq("user"), Mockito.any(), Mockito.any(), Mockito.any())).thenReturn(objects);
//
//        List<RoomSearchManagerResponseDto> result = roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//
//        assertNotNull(result);
//        assertEquals(6, result.size());
//        RoomSearchManagerResponseDto dto = result.get(0);
//        assertEquals(1L, dto.getHomestayId());
//        assertEquals("Amazing Meo Vac", dto.getHomestayName());
//        assertEquals(1L, dto.getHouseholdRoomTypeId());
//        assertEquals("Phong 2 nguoi", dto.getHouseholdRoomTypeName());
//        assertEquals(0, dto.getTotalSlotDefault());
//        assertEquals(1L, dto.getRoomId());
//        assertEquals("Phong 1", dto.getRoomName());
//        assertEquals(2, dto.getCapacity());
//        assertEquals(2, dto.getSingleBed());
//        assertEquals(0, dto.getDoubleBed());
//        assertEquals(BigDecimal.valueOf(2500.0), dto.getPrice());
//        assertEquals(false, dto.getIsDorm());
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager12() {
//        String homestayId = "";
//        String checkInDate = "2023-12-12";
//        String checkOutDate = "2023-12-13";
//
//        List<Object[]> objects = new ArrayList<>();
//
//        Object[] obj1 = {1L, "Amazing Meo Vac", 1L, "Phong 2 nguoi", 0, 1L, "Phong 1", 2, 2, 0, 2500.0, "0"};
//        Object[] obj2 = {1L, "Amazing Meo Vac", 2L, "Phong 3 nguoi", 0, 2L, "Phong 2", 3, 1, 1, 2800.0, "0"};
//        Object[] obj3 = {1L, "Amazing Meo Vac", 3L, "Dorm", 5, 3L, "Phong D1", 1, 1, 0, 180.0, "1"};
//        Object[] obj4 = {2L, "Amazing Meo Meo", 1L, "Phong 2 nguoi", 0, 2L, "Phong 2", 2, 2, 0, 2500.0, "0"};
//        Object[] obj5 = {2L, "Amazing Meo Meo", 2L, "Phong 3 nguoi", 0, 2L, "Phong 2", 2, 2, 0, 2500.0, "0"};
//        Object[] obj6 = {2L, "Amazing Meo Meo", 3L, "Dorm", 0, 2L, "Phong 2", 2, 2, 0, 2500.0, "0"};
//
//        Collections.addAll(objects, obj1, obj2, obj3, obj4, obj5, obj6);
//
//        Mockito.when(roomRepository.searchAvailableRoomsWithTotalDormSlotByManager(Mockito.eq("user"), Mockito.any(), Mockito.any(), Mockito.any())).thenReturn(objects);
//
//        List<RoomSearchManagerResponseDto> result = roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//
//        assertNotNull(result);
//        assertEquals(6, result.size());
//        RoomSearchManagerResponseDto dto = result.get(0);
//        assertEquals(1L, dto.getHomestayId());
//        assertEquals("Amazing Meo Vac", dto.getHomestayName());
//        assertEquals(1L, dto.getHouseholdRoomTypeId());
//        assertEquals("Phong 2 nguoi", dto.getHouseholdRoomTypeName());
//        assertEquals(0, dto.getTotalSlotDefault());
//        assertEquals(1L, dto.getRoomId());
//        assertEquals("Phong 1", dto.getRoomName());
//        assertEquals(2, dto.getCapacity());
//        assertEquals(2, dto.getSingleBed());
//        assertEquals(0, dto.getDoubleBed());
//        assertEquals(BigDecimal.valueOf(2500.0), dto.getPrice());
//        assertEquals(false, dto.getIsDorm());
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager13() {
//        String homestayId = "1";
//        String checkInDate = "2023-02-30";
//        String checkOutDate = "2023-03-01";
//
//        Mockito.when(messageSource.getMessage("date.invalid", null, Locale.getDefault())).thenReturn("Check in date or check out date is invalid");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager14() {
//        String homestayId = "1";
//        String checkInDate = "2021-12-12";
//        String checkOutDate = "2021-12-13";
//
//        Mockito.when(messageSource.getMessage("date.invalid", null, Locale.getDefault())).thenReturn("Check in date or check out date is invalid");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "user", roles = {"MANAGER"})
//    void testSearchAvailableRoomsWithTotalDormSlotByManager15() {
//        String homestayId = "1";
//        String checkInDate = "2023-02-28";
//        String checkOutDate = "2023-02-30";
//
//        Mockito.when(messageSource.getMessage("date.invalid", null, Locale.getDefault())).thenReturn("Check in date or check out date is invalid");
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            roomService.searchAvailableRoomsWithTotalDormSlotByManager(homestayId, checkInDate, checkOutDate);
//        });
//    }
//}