//package hbs.booking.service.impl;
//
//import hbs.booking.enums.BaseStatus;
//import hbs.booking.enums.HomestayStatus;
//import hbs.booking.model.dto.response.HomestayInformationForManager;
//import hbs.booking.model.dto.response.homestay.admin.HomestayListAdminResponseDto;
//import hbs.booking.model.entity.*;
//import hbs.booking.repository.AreaRepository;
//import hbs.booking.repository.HomestayRepository;
//import hbs.booking.repository.RoomRepository;
//import hbs.booking.util.exception.ResourceNotFoundException;
//import org.junit.jupiter.api.Test;
//import org.junit.runner.RunWith;
//import org.mockito.InjectMocks;
//import org.mockito.Mock;
//import org.mockito.Mockito;
//import org.mockito.junit.MockitoJUnitRunner;
//import org.modelmapper.ModelMapper;
//import org.modelmapper.PropertyMap;
//import org.modelmapper.TypeMap;
//import org.springframework.boot.test.context.SpringBootTest;
//import org.springframework.security.test.context.support.WithMockUser;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@RunWith(MockitoJUnitRunner.class)
//@SpringBootTest
//class HomestayServiceImplTest {
//    @Mock
//    private AreaRepository areaRepository;
//    @InjectMocks
//    private HomestayServiceImpl homestayService;
//    @Mock
//    private RoomRepository roomRepository;
//    @Mock
//    private HomestayRepository homestayRepository;
//    @Mock
//    private ModelMapper modelMapper;
//
//    @Test
//    @WithMockUser(username = "emailadmin@gmail.com", roles = "ADMIN")
//    void testGetAllHomestaysByAdmin1() {
//        // Mock list area
//        List<Area> areas = new ArrayList<>();
//
//        areas.add(Area.builder()
//                .id(1L)
//                .name("Khu A")
//                .image("imageA")
//                .status(BaseStatus.ACTIVE)
//                .build());
//
//        areas.add(Area.builder()
//                .id(2L)
//                .name("Khu B")
//                .image("imageB")
//                .status(BaseStatus.ACTIVE)
//                .build());
//
//        // Mock account
//        Account account = Account.builder()
//                .id(1L)
//                .email("householdemail@gmail.com")
//                .build();
//
//        //Mock manager
//        Manager manager = Manager.builder()
//                .id(1L)
//                .account(account)
//                .phoneNumber("0123456789")
//                .build();
//
//        // Mock household
//        Household household = Household.builder()
//                .id(1L)
//                .householdName("Household A")
//                .manager(manager)
//                .build();
//
//        // Mock list homestay
//        List<Homestay> homestays = new ArrayList<>();
//
//        homestays.add(Homestay.builder()
//                .id(1L)
//                .homestayCode("Homestay A")
//                .fullAddress("Address A")
//                .description("Description A")
//                .status(HomestayStatus.ACTIVE)
//                .area(areas.get(0))
//                .household(household)
//                .build());
//
//        homestays.add(Homestay.builder()
//                .id(2L)
//                .homestayCode("Homestay B")
//                .fullAddress("Address B")
//                .description("Description B")
//                .status(HomestayStatus.ACTIVE)
//                .area(areas.get(0))
//                .household(household)
//                .build());
//
//        Mockito.when(areaRepository.getAreasByAdmin()).thenReturn(areas);
//        Mockito.when(homestayRepository.findHomestaysByAreaId(1L)).thenReturn(homestays);
//
//        List<Homestay> homestayList = new ArrayList<>();
//
//        homestayList.add(Homestay.builder()
//                .id(3L)
//                .homestayCode("Homestay A")
//                .fullAddress("Address A")
//                .description("Description A")
//                .status(HomestayStatus.ACTIVE)
//                .area(areas.get(1))
//                .household(household)
//                .build());
//
//        homestayList.add(Homestay.builder()
//                .id(4L)
//                .homestayCode("Homestay B")
//                .fullAddress("Address B")
//                .description("Description B")
//                .status(HomestayStatus.ACTIVE)
//                .area(areas.get(1))
//                .household(household)
//                .build());
//
//        Mockito.when(homestayRepository.findHomestaysByAreaId(2L)).thenReturn(homestayList);
//
//        //Mock capacity of homestay
//        Mockito.when(homestayRepository.capacityOfHomestay(1L)).thenReturn(2);
//        Mockito.when(homestayRepository.capacityOfHomestay(2L)).thenReturn(4);
//        Mockito.when(homestayRepository.capacityOfHomestay(3L)).thenReturn(6);
//        Mockito.when(homestayRepository.capacityOfHomestay(4L)).thenReturn(8);
//
//        //Mock number of room of homestay
//        Mockito.when(roomRepository.countAllRoomByHomestayId(1L)).thenReturn(10);
//        Mockito.when(roomRepository.countAllRoomByHomestayId(2L)).thenReturn(20);
//        Mockito.when(roomRepository.countAllRoomByHomestayId(3L)).thenReturn(30);
//        Mockito.when(roomRepository.countAllRoomByHomestayId(4L)).thenReturn(40);
//
//        //Mock number of dorm of homestay
//        Mockito.when(roomRepository.countAllDormByHomestayId(1L)).thenReturn(5);
//        Mockito.when(roomRepository.countAllDormByHomestayId(2L)).thenReturn(10);
//        Mockito.when(roomRepository.countAllDormByHomestayId(3L)).thenReturn(15);
//        Mockito.when(roomRepository.countAllDormByHomestayId(4L)).thenReturn(20);
//
//        List<HomestayListAdminResponseDto> homestayListAdminResponseDtos = homestayService.findAllHomestaysByAdmin();
//
//        assertEquals(2, homestayListAdminResponseDtos.size());
//        assertEquals(2, homestayListAdminResponseDtos.get(0).getHomestayList().size());
//        assertEquals(2, homestayListAdminResponseDtos.get(1).getHomestayList().size());
//    }
//
//    @Test
//    @WithMockUser(username = "emailadmin@gmail.com", roles = "ADMIN")
//    void testGetAllHomestaysByAdmin2(){
//        List<Area> areas = new ArrayList<>();
//
//        Mockito.when(areaRepository.getAreasByAdmin()).thenReturn(areas);
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            homestayService.findAllHomestaysByAdmin();
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "emailadmin@gmail.com", roles = "ADMIN")
//    void testGetAllHomestaysByAdmin3(){
//        List<Area> areas = null;
//
//        Mockito.when(areaRepository.getAreasByAdmin()).thenReturn(areas);
//
//        assertThrows(ResourceNotFoundException.class, () -> {
//            homestayService.findAllHomestaysByAdmin();
//        });
//    }
//
//    @Test
//    @WithMockUser(username = "emailadmin@gmail.com", roles = "ADMIN")
//    void testGetAllHomestaysByAdmin4(){
//        List<Area> areas = new ArrayList<>();
//
//        areas.add(Area.builder()
//                .id(1L)
//                .name("Khu A")
//                .image("imageA")
//                .status(BaseStatus.ACTIVE)
//                .build());
//
//        areas.add(Area.builder()
//                .id(2L)
//                .name("Khu B")
//                .image("imageB")
//                .status(BaseStatus.ACTIVE)
//                .build());
//
//        Mockito.when(areaRepository.getAreasByAdmin()).thenReturn(areas);
//
//        List<Homestay> homestays = new ArrayList<>();
//        Mockito.when(homestayRepository.findHomestaysByAreaId(1L)).thenReturn(homestays);
//        Mockito.when(homestayRepository.findHomestaysByAreaId(2L)).thenReturn(homestays);
//
//        List<HomestayListAdminResponseDto> homestayListAdminResponseDtos = homestayService.findAllHomestaysByAdmin();
//
//        assertEquals(2, homestayListAdminResponseDtos.size());
//        assertEquals(0, homestayListAdminResponseDtos.get(0).getHomestayList().size());
//        assertEquals(0, homestayListAdminResponseDtos.get(1).getHomestayList().size());
//    }
//}